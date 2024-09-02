import Ads from "../ads/Ads";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    const limit = isAuthenticated ? undefined : 3;

    return (
        <>
            <Ads limit={limit} />
        </>
    );
}