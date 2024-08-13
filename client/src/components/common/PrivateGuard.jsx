import { AuthContext } from "../../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react";


export default function PrivateGuard() {
    const { isAuthenticated } = useContext(AuthContext);


    return isAuthenticated
        ? < Outlet />
        : < Navigate to="/login" />

}