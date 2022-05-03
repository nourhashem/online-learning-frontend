import axios from 'axios';
const baseURL = 'http://localhost:5000/';

const request = (method, url, reqParams) => {
  let data = {};
  let params = {};
  if (method === 'get') {
    params = {
      params: reqParams,
    };
  } else {
    data = reqParams;
  }
  return new Promise((resolve, reject) => {
    axios
      .request({
        method,
        baseURL,
        url,
        data,
        params,
      })
      .then((response) => {
        if (response.statusText === 'OK') resolve(response.data);
        reject('Request Error', response);
      })
      .catch((error) => reject('Request Failed', error));
  });
};

export default request;
