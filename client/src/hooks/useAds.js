import * as adsAPI from '../api/ads-api'
import { useState, useEffect, useContext } from "react";
import { AuthContext} from '../contexts/AuthContext';



export function useGetOneAd(adId) {
    const [ad, setAd] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);

            setAd(result);
        })();
    }, [adId]);

    return [ad];
};


export function useGetAllAds() {
    const [ads, setAds] = useState([]);
    const { accessToken } = useContext(AuthContext);  
    
    useEffect(() => {
        (async () => {
            const result = await adsAPI.getAllAds();
            
            setAds(result);
        })();
    }, []);

    return [ads];
};

export function useCreateAd() {
    const adCreateHanlder = (adData) => adsAPI.createAd(adData);

    return adCreateHanlder;
};


export function useUpdateAd() {
    const adUpdateHanlder = (adId, adData) => adsAPI.updateAd(adId, adData);

    return adUpdateHanlder;
}

