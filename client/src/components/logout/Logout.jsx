import {useLogout} from '../../hooks/useAuth'
import { Navigate } from "react-router-dom";

export default function Logout() {
    const logout = useLogout();
    
    logout();

   return(
       <Navigate to="/"/>
   );
};