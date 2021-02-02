export function logout() {
  document.cookie = "auth_token=;";
  document.location.reload();
}
