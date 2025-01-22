import * as request from './requester'
import { BASE_URL} from './config-api'

const ADS_BASE_URL = `${BASE_URL}/ads`;

export const getAllAds = async () => {
    const result = await request.get(ADS_BASE_URL);

    const ads = Object.values(result);
    return ads;
}

export const getMyAds = async () => {
    const result = await request.get(`${ADS_BASE_URL}/myads/`);

    const ads = Object.values(result);

    return ads;
}


export const getOneAd = async (adId) => {

    const result = await request.get(`${ADS_BASE_URL}/${adId}/details/`);
    const ad = result;

    return ad;
}

export const createAd = async (adData) => {
    
    // const { mainPhoto, ...rest } = adData;
    // const adDataPython = { main_photo: mainPhoto, ...rest };

    const result = await request.post(`${ADS_BASE_URL}/create/`, adData);
    
    // const { main_photo, ...rest2 } = result;
    // const resultJS = { mainPhoto: main_photo, ...rest2 };
    // console.log('resultJS', resultJS)
    const ad = result;

    return ad;
}

export const removeAd = async (adId) => await request.del(`${ADS_BASE_URL}/${adId}/delete`);

export const updateAd = async (adId, adData) => await request.put(`${ADS_BASE_URL}/${adId}/edit/`, adData);


const adsAPI = {
    getAllAds,
    getOneAd,
    getMyAds,
    createAd,
    removeAd,
    updateAd,

};

export default adsAPI;



// function convertAdsProps(ads) {
//     ads.map((ad) => {
//         ad['user']['firstName'] = ad['user']['first_name'];
//         ad['user']['lastName'] = ad['user']['last_name'];

//         delete ad['user']['first_name'];
//         delete ad['user']['last_name'];

//     });

// }


// export const getDAds = async () => {

//     const result = await request.get(BASE_URL);

//     const ads = Object.values(result);
//     return ads;
// }


// function convertAdProps(ad) {
//     ad['user']['firstName'] = ad['user']['first_name'];
//     ad['user']['lastName'] = ad['user']['last_name'];

//     delete ad['user']['first_name'];
//     delete ad['user']['last_name'];
    
//     return ad;
// }