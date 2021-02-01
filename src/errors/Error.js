import lang from '../lang/de_DE.json';

export function handleError(error) {
  let errorCode = error.response.status;
  switch (errorCode) {
    case 400:
      console.log('400 Bad Request');
      handleNotLoggedIn(error);
      break;
    case 401:
      console.log('401 Unauthorized');
      handleNotLoggedIn(error);
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
      break;
    case 501:
      console.log('501 Not Implemented');
      break;
    case 502:
      console.log('502 Bad Gateway');
      break;
    case 503:
      console.log('503 Service Unavailable');
      break;
    case 504:
      console.log('504 Gateway Timeout');
      break;
    default:
      console.log(error.message);
      break;
  }
}

function handleNotLoggedIn() {
  // Shows the error message not-logged-in in the body
  document.getElementById('body').innerHTML =
    '<div class="notification is-danger is-light has-text-centered">' +
    lang['error.not-logged-in'] +
    '</div>';
  // Replaces the navigation bar
  document.getElementById('navbar').innerHTML =
    '<nav class="navbar is-dark" role="navigation" aria-label="main navigation"> <div class="navbar-brand"><a class="navbar-item"><img src="/favicon.ico" width="30" height="60" alt="" /></a></div></nav>';
}
