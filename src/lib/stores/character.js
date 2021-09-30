import { backend_url } from '$lib/config/config.js';
import Cookie from 'js-cookie';
import fetchStore from './fetch.js';

async function url() {
  return `${backend_url}/user/character`; 
}

export default function () {
  return fetchStore(url, {
		method: 'GET',
		cache: 'no-cache',
		headers: { Authorization: 'Bearer ' + Cookie.get('auth_token') }
	});
}
