import axios from 'axios';

export default axios.create({
    baseURL: "https://heart-card.herokuapp.com"
});