import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.234:3000",

    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;