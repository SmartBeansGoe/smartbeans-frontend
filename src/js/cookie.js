import { BrowserRouter } from 'react-router-dom';

export function logout() {
  document.cookie = 'auth_token=;';
  document.location.reload();
  window.location.href = '/';
}
