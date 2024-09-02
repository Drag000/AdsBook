import { createContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";


export const AuthContext = createContext({
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    // phoneNumber: '',
    // profilePicture: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    onLogoutComplete: () => null,
    loginAuthManager: () => null,
}); 


export function AuthContextProvider(props) {
    const [authState, setAuthState] = usePersistedState('auth',{});
    
    const loginAuthManager = (state) => {
        localStorage.setItem('accessToken', state.token);
        setAuthState(state);
    };
    
    const changeAuthState = (state) => {
        setAuthState(state);
        console.log('state.lastName',state)
        console.log('state.lastName',state)
    };
    
    const onLogoutComplete = () => {
        localStorage.removeItem('accessToken');
        setAuthState({});
    };

    const contextData = {
        userId: authState?.userId,
        firstName: authState?.firstName,
        lastName: authState?.lastName,
        username: authState?.username,
        email: authState?.email,
        phoneNumber: authState?.phoneNumber,
        profilePicture: authState?.profilePicture,
        accessToken: authState?.token,
        isAuthenticated: !!authState?.token,
        changeAuthState,
        onLogoutComplete,
        loginAuthManager,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};