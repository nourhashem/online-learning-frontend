import { io } from 'socket.io-client';
import { SOCKET_URL } from 'api';

const token = localStorage.getItem('token');
const userUuid = localStorage.getItem('userUuid');

class Socket {
  constructor() {
    const _instance = this.initialize();
    this._instance = _instance;
  }

  initialize = () => {
    if (this._instance) return;
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
    Socket._instance = socket;
    return socket;
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
}

const socket = new Socket();

export default socket;
