import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Ad from '../ad/Ad';
import { useGetAllAds } from '../../hooks/useAds'




export default function Ads() {
    const [ads] = useGetAllAds();

    return (
        <Container className="p-2 my-5 border">
            {ads.length > 0
                ? ads.map(ad => < Ad key={ad._id} {...ad} />)
                : <h2>No Ads</h2>
            }

        </Container>
    );
}