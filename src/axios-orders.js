import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://your-burger.firebaseio.com/',
});

export default axiosConfig;