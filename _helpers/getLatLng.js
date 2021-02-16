import NodeGeocoder from "node-geocoder";

const options = {
    provider: 'google',
    //fetch: customFetchImplementation,
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

export default async (city) =>{
    return await geocoder.geocode(city);
}