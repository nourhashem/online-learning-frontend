import { io } from 'socket.io-client';
import { SOCKET_URL } from 'api';
import uuid from 'react-uuid';

import events from './events';

class Socket {
  constructor() {
    const _instance = this.initialize();
    this._instance = _instance;
  }

  initialize = () => {
    const token = sessionStorage.getItem('token');
    const userUuid = sessionStorage.getItem('userUuid');
    if (this._instance || !userUuid) return;
    const socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      query: {
        userUuid,
      },
      path: '/socket',
      transports: ['websocket'],
    });
    this._instance = socket;
    return socket;
  };

  disconnect = () => {
    if (!this._instance) return;
    this._instance.disconnect();
  };

  getInstance = () => {
    if (this._instance) return this._instance;
    const _instance = this.initialize();
    this._instance = _instance;
    return this;
  };

  on = (event, callback) => {
    if (!this._instance) this.initialize();
    this._instance.on(event, callback);
  };

  off = (event, callback) => {
    if (!this._instance) return;
    this._instance.off(event, callback);
  };

  removeAllListeners = (event) => {
    if (!this._instance) return;
    if (event) this._instance.removeAllListeners(event);
    else this._instance.removeAllListeners();
  };

  emit = (event, data) => {
    if (!this._instance) this.initialize();
    this._instance.emit(event, data);
  };

  sendMessage = (data) => {
    const userUuid = sessionStorage.getItem('userUuid');
    this.emit(events.SEND_MESSAGE, {
      ...data,
      uuid: uuid(),
      ownerUuid: userUuid,
      timestamp: Date.now(),
      date: new Date().toISOString(),
    });
  };
}

const socket = new Socket();

export default socket;
