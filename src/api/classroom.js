import request from './index';

const getAll = () => request('get', '/classrooms');
const add = (data) => request('post', '/classrooms', data);
const API = {
  getAll,
  add,
};

export default API;
