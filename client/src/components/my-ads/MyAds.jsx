import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useGetMyAds } from '../../hooks/useAds'
import Ad from '../ad/Ad';
import Container from 'react-bootstrap/Container';
import SpinnerComp from '../spinner/Spinner';



export default function MyAds() {
    const [ads, isFetching] = useGetMyAds();
    const { userId } = useContext(AuthContext);



    return (
        <Container className="p-2 my-5">
            <div className="row justify-content-center">
                {isFetching
                    ? <SpinnerComp />
                    : (ads.length > 0
                        ? (ads.map(ad => <Ad key={ad.id} {...ad} />))
                        : (<h3 className="p-2">You do not have any ads yet.</h3>))
                }
            </div>
        </Container >


    );

}