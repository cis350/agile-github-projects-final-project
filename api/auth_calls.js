const axios = require("axios");
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiConstants";


export const login = async (username, password) => {
  await axios
      .post(API_BASE_URL + "/api/auth/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status != 201) {
        } else {
          return {status: response.status, message: response.data.message};
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        return {status: error.response.status, message: error.response.data.message};
      });
    return {status: 500, message: "User Not Found"};
};

export const register = async (username, password) => {
  let res, err;
  await axios
      .post(API_BASE_URL + "/api/auth/signup", {
        username: username,
        email: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        res = response;
        return {status: response.status, message: response.data.message};
      })
      .catch((error) => {
        console.log(error.response.data.message);
        err = error;
        return {status: error.response.status, message: error.response.data.message};
      });
      if (!res) {
        return {status: 300, message: "There is already a user with that username"};
      } else {
        return {status: res.status, message: res.data.message};
      }
      
};
