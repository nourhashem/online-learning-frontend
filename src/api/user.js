import request from './index';

const signUp = (params) => request('post', '/users/signup', params);
const signIn = (params) => request('post', '/users/signin', params);

const API = {
  signIn,
  signUp,
};

export default API;
