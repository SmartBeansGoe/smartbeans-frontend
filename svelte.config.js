import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	// preprocess: [
	//   preprocess({
	//     defaults: {
	//       style: "postcss"
	//     },
	//     postcss: true
	//   })
	// ],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: () => ({
			plugins: [WindiCSS.default()]
		})
	}
};

export default config;
