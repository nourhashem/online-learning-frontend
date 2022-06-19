import request from './index';

const signUp = (params) => request('post', '/users/signup', params);
const signIn = (params) => request('post', '/users/signin', params);
const getClassroomMembers = (classroomUuid) =>
	request('get', '/users/classroom', { classroomUuid });

const API = {
	signIn,
	signUp,
	getClassroomMembers,
};

export default API;
