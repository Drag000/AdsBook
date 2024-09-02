import { useLogout} from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const logout = useLogout();
    
    const logoutandler = async () => {
        try {
            await logout();
            navigate('/');
            
        } catch (err) {
            console.log(err.message);
        }
    
    }
    
    logoutandler();

};