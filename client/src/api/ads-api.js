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
    const params = new URLSearchParams({
        load: `creater=_ownerId:users`,
    });

    const result = await request.get(`${BASE_URL}/${adId}?${params.toString()}`);

    const ad = result;
    console.log('RESULT', ad)
    
    return ad;
}

export const createAd = async (adData) => {
    const result = await request.post(BASE_URL, adData);

    const ad = result;

    return ad;
}

export const removeAd = async (adId) => await request.del(`${BASE_URL}/${adId}`);

export const updateAd = async (adId, adData) => await request.put(`${BASE_URL}/${adId}`, adData);


const adsAPI = {
    getAllAds,
    getOneAd,
    createAd,
    removeAd,
    updateAd,
    
};

export default adsAPI;