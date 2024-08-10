import adsAPI from "../api/ads-api";


export function useCreateAd() {
    const adCreateHanlder = (adData) => adsAPI.createAd(adData);

    return adCreateHanlder;
}