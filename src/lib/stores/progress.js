import { backend_url } from '$lib/config/config.js';
import Cookie from 'js-cookie';
import fetchStore from './fetch.js';
import { activeCourse } from '$lib/api/calls';

async function url() {
	return `${backend_url}/courses/${await activeCourse()}/progress`;
}

export default function () {
	return fetchStore(
		url,
		{
			method: 'GET',
			cache: 'no-cache',
			headers: { Authorization: 'Bearer ' + Cookie.get('auth_token') }
		},
		[]
	);
}
