import { axiosInstance } from '$lib/auth/auth';

export function activeCourse() {
	return axiosInstance()
		.get('/user/meta')
		.then((res) => {
			return res.data.activeCourse;
		})
		.catch((err) => {
			return err;
		});
}


export async function patch_user_character(character) {
	return await axiosInstance().patch('/user/character', character);
}


export async function load_task(courseId, taskId) {
	return await axiosInstance().get(`/courses/${courseId}/tasks/${taskId}`);
}

export async function load_task_submissions(courseId, taskId) {
	return await axiosInstance()
		.get(`/courses/${courseId}/tasks/${taskId}/submissions`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}

export async function submit_code(courseId, taskId, code) {
	return await axiosInstance()
		.post(`/courses/${courseId}/tasks/${taskId}/submissions`, { submission: code })
}
