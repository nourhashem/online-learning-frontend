import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const addUser = (params) =>
  axios.post(`${baseUrl}/users`, params).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );
