import axios from 'axios';
const CONSTANTS = require('./constants.json');

const api = axios.create({
    baseURL: CONSTANTS.baseURL + CONSTANTS.port,
});

api.interceptors.request.use(
    function (request) {
        console.log("AXIOS REQUEST", request);
        // console.log(localStorage.getItem('token'));
        request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return request;
    },
    function (error) {
        console.log(error);
    }
);

export default api;