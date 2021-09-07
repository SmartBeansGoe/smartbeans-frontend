import axios from 'axios';
import { backend_url } from '../config/config';

export function axiosInstance() {
	let auth_cookie = document.cookie.split('; ').find((row) => row.startsWith('auth_token'));
	console.log(auth_cookie);

	var auth_token;
	if (auth_cookie !== undefined) {
		auth_token = auth_cookie.split('=')[1];
	} else auth_token = 'not logged in';

	axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;

	return axios.create({
		baseURL: backend_url
	});
}
