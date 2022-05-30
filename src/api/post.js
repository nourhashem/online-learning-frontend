import request from './index';

const getAll = (classroomUuid) => request('get', '/posts', { classroomUuid });
const get = (postUuid) => request('get', `/posts/${postUuid}`);
const add = (title, body, classroomUuid) =>
  request('post', '/posts', { title, body, classroomUuid });
const addComment = (comment, postUuid) =>
  request('post', '/posts/comment', { comment, postUuid });

const API = {
  get,
  getAll,
  add,
  addComment,
};

export default API;
