import userFetch from './user';
import courseFetch from './course';
import characterFetch from './character';
import progressFetch from './progress';
import tasksFetch from './tasks';
import jsCookie from 'js-cookie';

export const [
	user,
	userLoading,
	userError,
	getUser,
	setTokenUser,
	userEmpty,
	resetUser
] = userFetch();
export const [
	course,
	courseLoading,
	courseError,
	getCourse,
	setTokenCourse,
	courseEmpty,
	resetCourse
] = courseFetch();
export const [
	character,
	characterLoading,
	characterError,
	getCharacter,
	setTokenCharacter,
	characterEmpty,
	resetCharacter
] = characterFetch();
export const [
	progress,
	progressLoading,
	progressError,
	getProgress,
	setTokenProgress,
	progressEmpty,
	resetProgress
] = progressFetch();
export const [
	tasks,
	tasksLoading,
	tasksError,
	getTasks,
	setTokenTasks,
	tasksEmpty,
	resetTasks
] = tasksFetch();

export function updateToken() {
	const token = jsCookie.get('auth_token');
	setTokenUser(token);
	setTokenCourse(token);
	setTokenCharacter(token);
	setTokenProgress(token);
	setTokenTasks(token);
}

export function resetStores() {
	resetCharacter();
	resetCourse();
	resetProgress();
	resetTasks();
	resetUser();
}
