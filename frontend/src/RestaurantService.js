import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RestaurantsService{

    constructor(){}

    getRestaurants() {
        const url = `${API_URL}/restaurants/`;
        return axios.get(url).then(response => response.data);
    }
    createRestaurant(restaurant){
        const url = `${API_URL}/restaurants/`;
        return axios.post(url, restaurant).then(response => response.data);
    }
}