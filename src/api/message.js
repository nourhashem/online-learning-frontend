import request from './index';

const getAll = (classroomUuid, offset) =>
  request('get', '/messages', { classroomUuid, offset });

const API = {
  getAll,
};

export default API;
