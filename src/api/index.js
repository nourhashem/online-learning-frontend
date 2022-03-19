import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const signUp = (params) =>
  axios.post(`${baseUrl}/users/signup`, params).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

const signIn = (params) =>
  axios.post(`${baseUrl}/users/signin`, params).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );

const API = {
  signIn,
  signUp,
};

export default API;
