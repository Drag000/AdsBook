import { useContext } from "react";
import { register, login, logout, updateProfile, updatePassword, getProfileDetails } from "../api/auth-api"
import { AuthContext } from '../contexts/AuthContext';



export const useLogin = () => {
    const { loginAuthManager } = useContext(AuthContext);

    const loginHandler = async (username, password) => {
        const resultPython = await login(username, password);

        const { user_id, first_name, last_name, ...rest } = resultPython;
        let resultJS = { userId: user_id, firstName: first_name, lastName: last_name, ...rest };

        loginAuthManager(resultJS);
        return resultJS;
    }

    return loginHandler;
};


export const useRegister = () => {
    const registerHandler = async (userData) => {
        // email, password, firstName, lastName, username
        
        const { firstName, lastName, ...rest } = userData;
        const userDataPython = { first_name: firstName, last_name: lastName, ...rest };
        
        const result = await register(userDataPython);
        return result;
    }

    return registerHandler;
};


export const useLogout = () => {
    const { onLogoutComplete } = useContext(AuthContext);

    const logoutHandler = async () => {
        await logout();
        onLogoutComplete();
    };

    return logoutHandler;
};


export const useUpdateProfile = () => {
    const profileUpdateHanlder = async (userId, profileData) => {
        const profileDataJS = profileData;

        const { firstName, lastName, ...rest } = profileDataJS;
        const profileDataPython = { user_id: userId, first_name: firstName, last_name: lastName, ...rest };

        const result = await updateProfile(userId, profileDataPython);
        
        const { id, first_name, last_name, ...rest2 } = result;
        const resultJS = { userId: id, firstName: first_name, lastName: last_name, ...rest2 };

        return resultJS;
    };

    return profileUpdateHanlder;
}


export const useGetProfileDetails = () => {
    const getProfileDetailsHanlder = async (userId) => {

        const resultPython = await getProfileDetails(userId);
        
        const { id, first_name, last_name, ...rest3 } = resultPython;
        const resultJS = { userId: id, firstName: first_name, lastName: last_name, ...rest3 };

        return resultJS;
    };

    return getProfileDetailsHanlder;
}


export const useUpdatePassword = () => {
    const passwordUpdateHanlder = async (userId, passwordsData) => {
    const passwordsDataJS = passwordsData
    
        const { oldPassword, newPassword } = passwordsDataJS
        let passwordDataPython = { old_password: oldPassword, new_password: newPassword };

        await updatePassword(userId, passwordDataPython);
    };

    return passwordUpdateHanlder;
}