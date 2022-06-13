import request from 'api';

const getAll = (deliverableUuid) =>
	request('get', '/attempts', { deliverableUuid });
const get = (attemptUuid) => request('get', `/attempts/${attemptUuid}`);
const add = (data, deliverableUuid) => {
	return request('post', '/attempts', { data, deliverableUuid });
};

const API = {
	get,
	getAll,
	add,
};

export default API;
