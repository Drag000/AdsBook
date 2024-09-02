import { useContext } from "react";
import { register, login, logout, updateProfile, updatePassword } from "../api/auth-api"
import { AuthContext } from '../contexts/AuthContext';




export const useLogin = () => {
    const { changeAuthState, loginAuthManager } = useContext(AuthContext);

    const loginHandler = async (username, password) => {
        const resultPython = await login(username, password);

        const { user_id, first_name, last_name, ...rest } = resultPython;
        let resultJS = { userId: user_id, firstName: first_name, lastName: last_name, ...rest };

        loginAuthManager(resultJS);
        // console.log('LOGIN RESULT', resultJS)
        return resultJS;
    }

    return loginHandler;
};


export const useRegister = () => {

    const registerHandler = async (email, password, firstName, lastName, username) => {

        const result = await register(email, password, firstName, lastName, username);
        // changeAuthState(result);

        return result;
    }

    return registerHandler;
};

export const useLogout = () => {
    const { onLogoutComplete, accessToken } = useContext(AuthContext);

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


export const useUpdatePassword = () => {
    const passwordUpdateHanlder = async (userId, passwordsData) => {
    const passwordsDataJS = passwordsData
    
        const { oldPassword, newPassword } = passwordsDataJS
        let passwordDataPython = { old_password: oldPassword, new_password: newPassword };

        await updatePassword(userId, passwordDataPython);
    };

    return passwordUpdateHanlder;
}