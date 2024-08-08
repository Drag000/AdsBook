import adAPI from "../api/ads-api";


export function useCreateAd() {
    const adCreateHanlder = (adData) => adAPI.createAd(adData);

    return adCreateHanlder;
}