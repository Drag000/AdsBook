import * as adsAPI from '../api/ads-api'
import { useState, useEffect } from "react";


export function useGetOneAd (adId) {
        const [ad, setAd] = useState([]);
    
    useEffect(() => {
        (async () => {
            const result = await adsAPI.getOneAd(adId);
            
            setAd(result);
        })();
    }, [adId]);
    
    return [ad];
};

export function useCreateAd() {
    const adCreateHanlder = (adData) => adsAPI.createAd(adData);

    return adCreateHanlder;
};

    
export function useUpdateAd () {
    const adUpdateHanlder = (adId, adData) => adsAPI.updateAd(adId, adData);

    return adUpdateHanlder;
}
    
