import { useContext } from "react";
import { register, login, logout} from "../api/auth-api"
import { AuthContext } from '../contexts/AuthContext';




export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const result = await login(email, password);
        
        changeAuthState(result);
        
        return result;
    }
    
    return loginHandler;
};


export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password) => {
        const result = await register(email, password);

        changeAuthState(result);

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
