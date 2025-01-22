import * as request from './requester'
import { BASE_URL} from './config-api'

const AUTH_BASE_URL = `${BASE_URL}/auth`;

export const login = async (username, password) => await request.post(`${AUTH_BASE_URL}/login/`, { username, password });

export const register = async (userData) => await request.post(`${AUTH_BASE_URL}/register/`, userData);

export const logout = async () => await request.post(`${AUTH_BASE_URL}/logout/`);
    
export const updateProfile = async (userId, profileData) => await request.put(`${AUTH_BASE_URL}/${userId}/edit/`, profileData);

export const updatePassword = async (userId, passwordsData) => await request.put(`${AUTH_BASE_URL}/${userId}/change-password/`, passwordsData);

export const deleteProfile = async (userId) => await request.del(`${AUTH_BASE_URL}/${userId}/delete/`);

export const getProfileDetails = async (userId) => await request.get(`${AUTH_BASE_URL}/${userId}/details/`);