import axios from 'axios';
import backend_url from './config';

const auth_cookie = document.cookie
  .split('; ')
  .find((row) => row.startsWith('auth_token'));

var auth_token;
if (auth_cookie !== undefined) auth_token = auth_cookie.split('=')[1];
else auth_token = 'not logged in';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;

const axios_inst = axios.create({
  baseURL: backend_url,
});

export default axios_inst;
