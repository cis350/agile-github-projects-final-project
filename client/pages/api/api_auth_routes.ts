import axios from 'axios';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': "balls"
    }
};

export const login = async (username: string, password: string) => {
    return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`, {
        username: username,
        email: username,
        password: password,
    }, axiosConfig);
    
    let token = response.data.accessToken;
    localStorage.setItem("SavedToken", token);
    axios.defaults.headers.common['Authorization'] = token;
    
    return response;
}

export const register = async (username: string, password: string) => {
    return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
        username: username,
        email: username,
        password: password,
    }, axiosConfig);
};

export const bookRide = async (pickup_location: string,
    dropoff_location: string,
    pickup_window: string,
    number_passengers: Number,
    number_suitcases: Number) => {
        return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/bookRide`, {
            pickup_location: pickup_location,
            dropoff_location: dropoff_location,
            pickup_window: pickup_window,
            number_passengers: number_passengers,
            number_suitcases: number_suitcases
        }, axiosConfig);
    };