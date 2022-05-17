import request from './index';

const getAll = () => request('get', '/classrooms');
const add = (
  title,
  code,
  semester,
  campus,
  instructorUuid,
  schedule,
  section,
  studentsEmailsArray
) =>
  request('post', '/classrooms', {
    title,
    code,
    semester,
    campus,
    instructorUuid,
    schedule,
    section,
    studentsEmailsArray,
  });
const API = {
  getAll,
  add,
};

export default API;
