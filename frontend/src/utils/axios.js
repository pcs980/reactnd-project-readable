import axios from 'axios';

// Prepare an Axios instance with default properties
const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 2000,
  headers: {
    'Authorization': '4p1k3y'
  }
});

instance.all = axios.all;

export default instance;