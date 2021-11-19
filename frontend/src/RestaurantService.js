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
    getRestaurant(pk){
        const url = `${API_URL}/restaurants/${pk}/`;
        return axios.get(url).then(response => response.data);
    }
    updateRestaurant(restaurant){
        const url = `${API_URL}/restaurants/${restaurant.id}/`;
        return axios.put(url, restaurant);
    }
    deleteRestaurant(restaurant){
        const url = `${API_URL}/restaurants/${restaurant.id}/`;
        return axios.delete(url);
    }
}