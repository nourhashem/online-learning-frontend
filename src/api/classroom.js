import request from './index';

const getAll = () => request('get', '/classrooms');

const API = {
  getAll,
};

export default API;
