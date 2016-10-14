import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { browserHistory } from 'react-router';

function generateApiUrl(relativePath) {
  return (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/${relativePath}`) : `/${relativePath}`;
}

export const API_URL = generateApiUrl('api');

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    if (typeof window !== 'undefined' && response.status === 401) {
      localStorage.removeItem('authentication_token');
      browserHistory.push('/');
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error
    }
    return Promise.reject(response);
  }
};

const parseJSON = (response) => {
  if (response && response.json) {
    return response.json();
  } else {
    throw new Error('Response not contain JSON')
  }
};

function fetchWrapper(url, requestOptions) {
  return fetch(url, {
    ...requestOptions,
    headers: { ...requestOptions.headers, "Authorization": 'JWT ' + getAuthenticationToken() }
  }).then((response)=> {
    return checkStatus(response);
  }).then(parseJSON)
    .catch((error) => {
      console.log('request failed', error);
      throw error;
    });
}

export default function callApi(endpoint, method = 'get', body) {
  let requestOptions = {
    headers: {
      'content-type': 'application/json'
    },
    method,
    body: JSON.stringify(body),
  };

  return fetchWrapper(`${API_URL}/${endpoint}`, requestOptions);
}

export function callApiForm(endpoint, method = 'get', body) {
  let requestOptions = {
    method,
    body,
  };

  return fetchWrapper(`${API_URL}/${endpoint}`, requestOptions);
}

export const getAuthenticationToken = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return localStorage.authentication_token
  }
};

export const getIsAdmin = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return JSON.parse(localStorage.is_admin) === true
  }
};

export const isLoggedIn = () => {
  return !!getAuthenticationToken();
};

export const isAdmin = () => {
  return isLoggedIn() && getIsAdmin();
};
