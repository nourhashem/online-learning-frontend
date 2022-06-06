import request from './index';

const getAll = (classroomUuid) =>
	request('get', '/deliverables', { classroomUuid });
const get = (deliverableUuid) =>
	request('get', `/deliverables/${deliverableUuid}`);
const add = (data, classroomUuid) =>
	request('post', '/deliverables', { data, classroomUuid });
const submit = (data, deliverableUuid) =>
	request('post', '/deliverables/submit', { data, deliverableUuid });

const API = {
	get,
	getAll,
	add,
	submit,
};

export default API;
