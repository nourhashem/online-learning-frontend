import axios from 'axios';
const baseURL = 'http://localhost:5000/';

const request = (method, url, reqParams) => {
  let data = {};
  let params = {};
  if (method === 'get') {
    params = reqParams;
  } else {
    data = reqParams;
  }
  const token = localStorage.getItem('token') || '';
  const authorizationHeader = `Bearer ${token}`;
  return new Promise((resolve, reject) => {
    axios
      .request({
        method,
        baseURL,
        url,
        data,
        params,
        headers: {
          Authorization: authorizationHeader,
        },
      })
      .then((response) => {
        if (response.statusText === 'OK') resolve(response.data);
        reject('Request Error', response);
      })
      .catch((error) => reject('Request Failed', error));
  });
};

export const SOCKET_URL = 'ws://localhost:5000/';
export default request;
