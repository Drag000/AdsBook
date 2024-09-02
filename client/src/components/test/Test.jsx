// import { useState, useEffect } from "react";
// import * as adsAPI from '../../api/ads-api'
// import Ad from '../ad/Ad';
// import Container from 'react-bootstrap/Container';


// export default function Test() {
//     const [ads] = useGetDAds();

//     //useAds
//     function useGetDAds() {
//         const [ads, setAds] = useState([]);

//         useEffect(() => {
//             (async () => {
//                 const result = await adsAPI.getDAds();

//                 setAds(result);
//             })();
//         }, []);

//         return [ads];
//     };


//     console.log('DJANDO HOME', ads)

//     return (
//         <Container className="p-2 my-5 border">
//             {ads.length > 0
//                 ? ads.map(ad => < Ad key={ad._id} {...ad} />)
//                 : <h2>No Ads</h2>
//             }

//         </Container>
//     );
// }