import * as request from './requester'

const BASE_URL = 'http://localhost:3030/data/ads';

export const getAllAds = async () => {
    const params = new URLSearchParams({
        load: `creater=_ownerId:users`,
    });

    
    const result = await request.get(`${BASE_URL}?${params.toString()}`);
    
    const ads = Object.values(result);
    
    return ads;
}

export const getOneAd = async (adId) => {
    const result = await request.get(`${BASE_URL}/${adId}`);

    const ad = result;

    return ad;
}

export const createAd = async (adData) => {
    const result = await request.post(BASE_URL, adData);

    const ad = result;

    return ad;
}

const adsAPI = {
    getAllAds,
    getOneAd,
    createAd,
};

export default adsAPI;