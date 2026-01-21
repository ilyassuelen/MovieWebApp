import { apiClient } from './client';

export interface Movie {
  id: number;
  name: string;
  director: string;
  release_year: number;
  poster_url: string | null;
  user_id: number;
}

export interface AddMovieRequest {
  title: string;
}

export interface UpdateMovieRequest {
  new_title: string;
}

export const moviesApi = {
  getByUser: (userId: number) =>
    apiClient.get<Movie[]>(`/api/users/${userId}/movies`),

  add: (userId: number, data: AddMovieRequest) =>
    apiClient.post<Movie>(`/api/users/${userId}/movies`, data),

  update: (userId: number, movieId: number, data: UpdateMovieRequest) =>
    apiClient.put<Movie>(`/api/users/${userId}/movies/${movieId}`, data),

  delete: (userId: number, movieId: number) =>
    apiClient.delete<void>(`/api/users/${userId}/movies/${movieId}`),
};
