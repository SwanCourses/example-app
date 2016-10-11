import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

function generateApiUrl(relativePath) {
  return (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/${relativePath}`) : `/${relativePath}`;
}

export const API_URL = generateApiUrl('api');

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
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
  return fetch(url, requestOptions)
    .then((response)=> {
      return checkStatus(response);
    })
    .then(parseJSON)
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
