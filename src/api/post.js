import request from './index';

const getAll = (classroomUuid) => request('get', '/posts', { classroomUuid });
const add = (title, body, classroomUuid) =>
  request('post', '/posts', { title, body, classroomUuid });

const API = {
  getAll,
  add,
};

export default API;
