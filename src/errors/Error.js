import lang from '../lang/de_DE.json';

export function handleError(error) {
  if (error.response === undefined) {
    handleNoServerConnection();
    return;
  }
  let errorCode = error.response.status;
  switch (errorCode) {
    case 400:
      console.log('400 Bad Request');
        handleNotLoggedIn();
      break;
    case 401:
      console.log('401 Unauthorized');
        handleNotLoggedIn();
      break;
    case 402:
      console.log('402 Payment Required');
      break;
    case 403:
      console.log('403 Forbidden');
      break;
    case 404:
      console.log('404 Not Found');
      break;
    case 405:
      console.log('405 Method Not Allowed');
      break;
    case 500:
      console.log('500 Internal Server Error');
        handleServerError(500);
      break;
    case 501:
      console.log('501 Not Implemented');
        handleServerError(501);
      break;
    case 502:
      console.log('502 Bad Gateway');
        handleServerError(502);
      break;
    case 503:
      console.log('503 Service Unavailable');
        handleServerError(503);
      break;
    case 504:
      console.log('504 Gateway Timeout');
        handleServerError(504);
      break;
    default:
        console.log(error.message);
      break;
  }
}

function handleNotLoggedIn() {
  showErrorMessage(lang['error.not-logged-in']);
}

function handleNoServerConnection() {
  showErrorMessage(lang['error.server.no-connection']);
}

function handleServerError(errorCode) {
  showErrorMessage(lang['error.server.message'] + ' Error: ' + errorCode);
}

function showErrorMessage(message) {
  document.getElementById('body').innerHTML =
    '<div class="notification is-danger is-light has-text-centered" style="width:100%">' +
    message +
    '</div>';
}
