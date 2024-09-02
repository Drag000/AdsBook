import * as request from './requester'

const BASE_URL = 'http://localhost:8000/auth';

export const login = (username, password) => request.post(`${BASE_URL}/login/`, { username, password });

export const register = (
    email, password, firstName, lastName, username,
    ) => {
        const first_name = firstName;
        const last_name = lastName;
    
        return request.post(`${BASE_URL}/register/`, { 
        email, password, first_name, last_name, username, 
        });
}

export const logout = async () => {
    await request.post(`${BASE_URL}/logout/`);
    
    
}

export const updateProfile = async (userId, profileData) => {

    const result = await request.put(`${BASE_URL}/${userId}/edit/`, profileData);
    
    return result;

};

export const updatePassword = async (userId, passwordsData) => await request.put(`${BASE_URL}/${userId}/change-password/`, passwordsData);

export const deleteProfile = async (userId) => await request.del(`${BASE_URL}/${userId}/delete/`);
