import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Ad from '../ad/Ad';
import { useState, useEffect } from 'react';
import * as adsAPI from '../../api/ads-api'




export default function Ads() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getAllAds();

            setAds(result);
        })();
    }, []);



    return (
        <Container className="p-2 my-5 border">
            { ads.length > 0
                ? ads.map(ad => < Ad key={ad._id} {...ad} />)
                : <h2>No Ads</h2>
            }

        </Container>
    );
}