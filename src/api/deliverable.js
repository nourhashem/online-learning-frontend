import request from './index';

const getAll = (classroomUuid) =>
	request('get', '/deliverables', { classroomUuid });
const get = (deliverableUuid, answers) =>
	request('get', `/deliverables/${deliverableUuid}`, { answers });
const add = (data, classroomUuid) =>
	request('post', '/deliverables', { data, classroomUuid });
const publish = (deliverableUuid) =>
	request('post', '/deliverables/publish', { deliverableUuid });

const API = {
	get,
	getAll,
	add,
	publish,
};

export default API;
