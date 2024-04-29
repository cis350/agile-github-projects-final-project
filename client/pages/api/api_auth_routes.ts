import axios from 'axios';
require('dotenv').config();

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };


export const login = async (username: string, password: string) => {
    return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`, {
        username: username,
        email: username,
        password: password,
        },
        axiosConfig);
};

export const register = async (username: string, password: string) => {
    return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
        username: username,
        email: username,
        password: password,
      },
      axiosConfig);
};