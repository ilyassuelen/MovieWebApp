from flask import Flask
from data_manager import DataManager
from models import db, Movie
import os

app = Flask(__name__)

# Configuring SQLAlchemy
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'data/movies.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Connect DB & App
db.init_app(app)

# Create DataManager Object
data_manager = DataManager()

@app.route("/")
def home():
    return "Welcome to the MovieWebApp!"


if __name__ == '__main__':
  with app.app_context():
    db.create_all()

  app.run()