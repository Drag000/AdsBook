import * as adsAPI from '../api/ads-api'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';



export function useGetOneAd(adId) {
    const [ad, setAd] = useState({
        id: "",
        title: "", 
        location: "",
        condition: "",
        description: "",
        price: "",
        photo: "",
    }
    );

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
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getAllAds();

            setAds(result);
            setIsFetching(false);
        })();
    }, []);

    return [ads, isFetching];
};

export function useGetMyAds() {
    const [ads, setAds] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await adsAPI.getMyAds();

            setAds(result);
            setIsFetching(false);
        })();
    }, []);

    return [ads, isFetching];
};

export function useCreateAd() {
    const adCreateHanlder = (adData) => adsAPI.createAd(adData);

    return adCreateHanlder;
};


export function useUpdateAd() {
    const adUpdateHanlder = (adId, adData) => adsAPI.updateAd(adId, adData);

    return adUpdateHanlder;
}


