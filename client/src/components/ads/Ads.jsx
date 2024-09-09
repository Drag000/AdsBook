
import Container from 'react-bootstrap/Container';
import Ad from '../ad/Ad';
import { useGetAllAds } from '../../hooks/useAds'
import SpinnerComp from '../spinner/Spinner';



export default function Ads({ limit }) {
    const [ads, isFetching] = useGetAllAds();
    const displayedAds = limit ? ads.slice(0, limit) : ads;

    return (
        <Container className="p-2 my-5">
            <div className="row justify-content-center">
                {isFetching
                    ? <SpinnerComp />
                    : (displayedAds.length > 0
                        ? (displayedAds.map(ad => < Ad key={ad.id} {...ad} />))
                        : (<h2>No Ads</h2>))
                }
            </div>
        </Container>
    );
}