import * as request from './requester'

const BASE_URL = 'http://localhost:3030/data/ads';

export const getAllAds = async () => {
    const result = await request.get(BASE_URL);

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

const adAPI = {
    getAllAds,
    getOneAd,
    createAd,
};

export default adAPI;