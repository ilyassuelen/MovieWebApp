import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Movie

load_dotenv()

app = Flask(__name__)

# Configuring SQLAlchemy
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data/movies.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Connect DB & App
db.init_app(app)

# Allow frontend dev server (Vite) to call this API
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ---- OMDb ----
OMDB_API_KEY = os.getenv("OMDB_API_KEY")


# ---------- Helpers ----------
def user_to_dict(u: User):
    return {"id": u.id, "name": u.name}


def movie_to_dict(m: Movie):
    return {
        "id": m.id,
        "name": m.name,
        "director": m.director,
        "release_year": m.release_year,
        "poster_url": m.poster_url,
        "user_id": m.user_id,
    }


def json_error(message: str, status: int = 400):
    return jsonify({"error": message}), status


# ---------- API Routes ----------
@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


# USERS
@app.get("/api/users")
def get_users():
    users = User.query.order_by(User.id.asc()).all()
    return jsonify([user_to_dict(u) for u in users])


@app.post("/api/users")
def create_user():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()

    if not name:
        return json_error("Name is required", 400)

    new_user = User(name=name)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(user_to_dict(new_user)), 201


# MOVIES
@app.get("/api/users/<int:user_id>/movies")
def get_movies_by_user(user_id: int):
    user = User.query.get(user_id)
    if user is None:
        return json_error("User not found", 404)

    movies = Movie.query.filter_by(user_id=user_id).order_by(Movie.id.desc()).all()
    return jsonify([movie_to_dict(m) for m in movies])


@app.post("/api/users/<int:user_id>/movies")
def add_movie(user_id: int):
    user = User.query.get(user_id)
    if user is None:
        return json_error("User not found", 404)

    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if not title:
        return json_error("Title is required", 400)

    # OMDb request
    url = f"http://www.omdbapi.com/?t={title}&apikey={OMDB_API_KEY}"
    try:
        response = requests.get(url, timeout=10).json()
    except Exception:
        return json_error("Failed to fetch movie data from OMDb", 502)

    if response.get("Response") == "False":
        return json_error(response.get("Error", "Movie not found"), 404)

    # release year parsing (OMDb returns string)
    year_raw = response.get("Year")
    year_int = None
    if isinstance(year_raw, str):
        # If release-year is like "2019–2021" -> take first part
        try:
            year_int = int(year_raw.split("–")[0].split("-")[0])
        except Exception:
            year_int = None

    movie = Movie(
        name=response.get("Title") or title,
        director=response.get("Director") or "Unknown",
        release_year=year_int,
        poster_url=(response.get("Poster") if response.get("Poster") != "N/A" else None),
        user_id=user_id,
    )

    db.session.add(movie)
    db.session.commit()
    return jsonify(movie_to_dict(movie)), 201


@app.put("/api/users/<int:user_id>/movies/<int:movie_id>")
def update_movie(user_id: int, movie_id: int):
    user = User.query.get(user_id)
    if user is None:
        return json_error("User not found", 404)

    movie = Movie.query.get(movie_id)
    if movie is None or movie.user_id != user_id:
        return json_error("Movie not found", 404)

    data = request.get_json(silent=True) or {}
    new_title = (data.get("new_title") or "").strip()
    if not new_title:
        return json_error("new_title is required", 400)

    movie.name = new_title
    db.session.commit()
    return jsonify(movie_to_dict(movie)), 200


@app.delete("/api/users/<int:user_id>/movies/<int:movie_id>")
def delete_movie(user_id: int, movie_id: int):
    user = User.query.get(user_id)
    if user is None:
        return json_error("User not found", 404)

    movie = Movie.query.get(movie_id)
    if movie is None or movie.user_id != user_id:
        return json_error("Movie not found", 404)

    db.session.delete(movie)
    db.session.commit()
    return ("", 204)


@app.errorhandler(404)
def not_found(_):
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5001, debug=True)