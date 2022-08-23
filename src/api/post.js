import request from './index';

const getAll = (classroomUuid) => request('get', '/posts', { classroomUuid });
const get = (postUuid) => request('get', `/posts/${postUuid}`);
const add = (title, body, classroomUuid) =>
  request('post', '/posts', { title, body, classroomUuid });
const addComment = (comment, postUuid) =>
  request('post', '/posts/comment', { comment, postUuid });
const update = (title, body, uuid) =>
  request('put', '/posts', { title, body, uuid });
const remove = (postUuid) => request('delete', `/posts/${postUuid}`);
const upload = (files) => request('post', 'posts/attachments', files, true);

const API = {
  get,
  getAll,
  add,
  addComment,
  update,
  remove,
  upload,
};

export default API;
