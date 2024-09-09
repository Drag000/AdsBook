import * as request from './requester'

const BASE_URL = 'http://localhost:8000/auth';

export const login = async (username, password) => await request.post(`${BASE_URL}/login/`, { username, password });

export const register = async (userData) => await request.post(`${BASE_URL}/register/`, userData);

export const logout = async () => await request.post(`${BASE_URL}/logout/`);
    
export const updateProfile = async (userId, profileData) => await request.put(`${BASE_URL}/${userId}/edit/`, profileData);

export const updatePassword = async (userId, passwordsData) => await request.put(`${BASE_URL}/${userId}/change-password/`, passwordsData);

export const deleteProfile = async (userId) => await request.del(`${BASE_URL}/${userId}/delete/`);

export const getProfileDetails = async (userId) => await request.get(`${BASE_URL}/${userId}/details/`);