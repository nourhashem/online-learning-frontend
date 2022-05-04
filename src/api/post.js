import request from './index';

const getAll = (classroomUuid) => request('get', '/posts', { classroomUuid });

const API = {
  getAll,
};

export default API;
