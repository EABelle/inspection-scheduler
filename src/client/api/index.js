import Axios from 'axios';
import Cookies from 'universal-cookie';
import config from './config';

const cookies = new Cookies();

const axios = Axios.create({
  baseURL: config.baseURL,
});

axios.defaults.headers.common['X-Api-Key'] = config.apikey;

function getHeaders(customConfig) {
  const Authorization = cookies.get('inspector_token');
  const authHeaders = Authorization ? { Authorization } : {};
  return customConfig ? { ...customConfig.headers, ...authHeaders } : { ...authHeaders };
}

export function get(url, customConfig) {
  const headers = getHeaders(customConfig);
  return axios.get(url, { headers, ...customConfig });
}

export function post(url, body, customConfig) {
  const headers = getHeaders(customConfig);
  return axios.post(url, body, { headers, ...customConfig });
}

export function put(url, body, customConfig) {
  const headers = getHeaders(customConfig);
  return axios.put(url, body, { headers, ...customConfig });
}

export function delete_(url, body, customConfig) {
  const headers = getHeaders(customConfig);
  return axios.delete(url, { headers, ...customConfig });
}
