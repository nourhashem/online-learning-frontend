import axios from 'axios';
const baseURL = 'http://localhost:5000/';

const request = (method, url, reqParams, upload = false) => {
  let data = {};
  let params = {};
  if (method === 'get') {
    params = reqParams;
  } else {
    data = reqParams;
  }
  console.log(data);
  //console.log(data.getAll && data.getAll('attachments'));
  const token = sessionStorage.getItem('token') || '';
  const authorizationHeader = `Bearer ${token}`;
  const uploadHeaders = upload
    ? {
        //'Content-Type': 'multipart/form-data',
      }
    : {};
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
          ...uploadHeaders,
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
