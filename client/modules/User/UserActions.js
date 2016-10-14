/**
 * Created by alex on 13.10.16.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users/registration', 'post', { user }).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function signInRequest(creds) {
  return (dispatch) => {
    return callApi('auth', 'post', creds).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}
