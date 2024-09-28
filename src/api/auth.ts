import { AuthRequest, AuthResponse } from '../types/auth';
import apiClient from './apiClient';

export const authenticateUser = async (authRequest: AuthRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/v1/auth', authRequest);
    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};