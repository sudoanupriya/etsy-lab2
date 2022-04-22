import axios from 'axios';
const CONSTANTS = require('./constants.json');

const api = axios.create({
    baseURL: CONSTANTS.baseURL + CONSTANTS.port,
});
if (localStorage.getItem("token")) {
    api.interceptors.request.use(
        function (request) {
            request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            return request;
        },
        function (error) {
            console.log(error);
        }
    );
}
export default api;