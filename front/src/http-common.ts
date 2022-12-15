import axios from "axios";

const baseURL = process.env.REACT_APP_API_DOMAIN
export default axios.create({
    baseURL: baseURL,
    headers: {
        'accept': 'application/json',
        'Content-type': 'multipart/Form-data',
        'Accept-Language': 'en-US,en;q=0.8'
    }
});