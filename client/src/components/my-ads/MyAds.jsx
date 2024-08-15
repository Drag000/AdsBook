import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useGetAllAds } from '../../hooks/useAds'
import Ad from '../ad/Ad';
import Container from 'react-bootstrap/Container';

export default function MyAds() {
    const [ads] = useGetAllAds();
    const { userId } = useContext(AuthContext);
    const userAds = ads 
        ? ads.filter(ad => ad.creater._id === userId) 
        : [];
    
    return (    
        <Container className="p-2 my-5  border">
        {userAds.length > 0 ? (
            userAds.map(ad => <Ad key={ad._id} {...ad} />)
        ) : (
            <h3 className="p-2">You do not have any ads yet.</h3>
        )}
    </Container>


    );

}