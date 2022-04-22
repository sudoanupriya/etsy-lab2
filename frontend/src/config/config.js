import axios from 'axios';
const constants = require('./constants.json');

export default axios.create({
    baseURL: constants.baseURL+constants.port,
});