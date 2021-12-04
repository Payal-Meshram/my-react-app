import axios from 'axios';

const SERVER_URL = 'https://reactjs-node-app-test.herokuapp.com/v1';
const AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 180 * 1000, // 180 second server timeout
    headers: {
        'Accept': 'application/json text/plain, */*',
        'Content-Type': 'application/json',
    },
    // withCredentials: true // Need for sending browser cookies in every request
});
export default AxiosInstance;