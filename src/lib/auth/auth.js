import axios from 'axios';
import { backend_url } from '../config/config';
import Cookies from 'js-cookie';

export function axiosInstance() {
	let auth_token = Cookies.get('auth_token');
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;

	return axios.create({
		baseURL: backend_url
	});
}
