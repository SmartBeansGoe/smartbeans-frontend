// Based on https://svelte.dev/repl/b2d671b8119845ca903667f1b3a96e31?version=3.37.0 by Kevin Åberg Kultalahti

import jsCookie from 'js-cookie';
import { writable } from 'svelte/store';

export default function (url, input, init = {}) {
	const loading = writable(false);
	const error = writable(false);
	const data = writable(init);

	async function get() {
		loading.set(true);
		error.set(false);
		try {
			const response = await fetch(await url(), input);
			data.set(await response.json());
		} catch (e) {
			error.set(e);
		}
		loading.set(false);
	}

	function setToken(token) {
		let oldToken = input.headers['Authorization'];
		input.headers['Authorization'] = 'Bearer ' + token;
		if (oldToken != input.headers['Authorization']) {
			reset();
		}
	}

	function empty() {
		let value;

		data.subscribe((v) => (value = v));
		if (Object.getPrototypeOf(value) == Object.prototype) {
			return Object.keys(value).length == 0;
		}
		if (Object.getPrototypeOf(value) == Array.prototype) {
			return value.length == 0;
		}
		return value == null || value == undefined;
	}

	function reset() {
		loading.set(false);
		error.set(false);
		if (Object.getPrototypeOf(init) == Object.prototype) {
			data.set({});
		} else if (Object.getPrototypeOf(init) == Array.prototype) {
			data.set([]);
		} else {
			data.set(init);
		}
	}

	if (jsCookie.get('auth_token') != undefined) get();

	return [data, loading, error, get, setToken, empty, reset];
}
