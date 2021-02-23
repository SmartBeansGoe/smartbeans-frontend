import { BrowserRouter } from "react-router-dom";

export function logout() {
  document.cookie = "auth_token=;"
  window.location.href = "/";
  document.location.reload();

}
