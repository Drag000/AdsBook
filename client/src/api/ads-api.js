import * as request from './requester'

const BASE_URL = 'http://localhost:3030/data/ads'

export const getAllAds = async () => {
    const result = await request.get(BASE_URL);
    
    const ads = Object.values(result);
    
    return ads;
}

export const getOneAd = async (adId) => {
    const result = await request.get(`${BASE_URL}/${adId}`);
    
    const ad = result;
    
    return ad
}
    


const adAPI = {
    getAllAds,
    getOneAd,
};

export default adAPI;