import { axiosInstance } from '$lib/auth/auth';
import tasks from '$lib/stores/tasks';
import user from '$lib/stores/user';
import character from '$lib/stores/character';
import course from '$lib/stores/course';

export async function load_user_meta() {
	return await axiosInstance()
		.get('/user/meta')
		.then((res) => {
			user.set(res.data);
			return res;
		})
		.catch((err) => {
			return err;
		});
}

export async function load_user_character() {
	return await axiosInstance()
		.get('/user/character')
		.then((res) => {
			character.set(res.data);
			return res;
		})
		.catch((err) => {
			return err;
		});
}

export async function patch_user_character(character) {
	return await axiosInstance().patch('/user/character', character);
}

export async function load_course_meta(courseId) {
	return await axiosInstance()
		.get(`/courses/${courseId}/meta`)
		.then(async (res) => {
			let data = res.data;
			course.set(data);
			return res;
		})
		.catch((err) => {
			return err;
		});
}
export async function load_tasks(courseId) {
	return await axiosInstance()
		.get(`/courses/${courseId}/tasks`)
		.then(async (res) => {
			let data = res.data;
			data.sort((a, b) => a.order_by - b.order_by);
			tasks.set(data);
			return res;
		})
		.catch((err) => {
			return err;
		});
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
		.post(`/courses/${courseId}/tasks/${taskId}/submissions`, code)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}
