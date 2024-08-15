import { createContext, useState } from "react";


export const AuthContext = createContext({
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null,
    onLogoutComplete: () => null,
});


export function AuthContextProvider(props) {
    const [authState, setAuthState] = useState({});

    const changeAuthState = (state) => {
        localStorage.setItem('accessToken', state.accessToken);

        setAuthState(state);
    };

    const logout = () => {

        setAuthState({});
    };
    
    const onLogoutComplete = () => {

        logout();
    };

    const contextData = {
        userId: authState?._id,
        firstName: authState?.firstName,
        lastName: authState?.lastName,
        username: authState?.username,
        email: authState?.email,
        phoneNumber: authState?.phoneNumber,
        profilePicture: authState?.profilePicture,
        accessToken: authState?.accessToken,
        isAuthenticated: !!authState?.email,
        changeAuthState,
        logout,
        onLogoutComplete,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};