import { apiClient } from './client';

export interface User {
  id: number;
  name: string;
}

export interface CreateUserRequest {
  name: string;
}

export const usersApi = {
  getAll: () => apiClient.get<User[]>('/api/users'),
  create: (data: CreateUserRequest) => apiClient.post<User>('/api/users', data),
};
