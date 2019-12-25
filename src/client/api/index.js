import Axios from 'axios';
import Cookies from 'universal-cookie';
import config from './config';

const cookies = new Cookies();

const axios = Axios.create({
  baseURL: config.baseURL,
});

axios.defaults.headers.common['X-Api-Key'] = config.apikey;

export function get(url, customConfig) {
  const Authorization = cookies.get('inspector_token');
  const authHeaders = Authorization ? { Authorization } : {};
  const headers = customConfig ? { ...customConfig.headers, ...authHeaders } : { ...authHeaders };
  return axios.get(url, { headers, ...customConfig }).catch((err) => { alert(err); });
}

export function post(url, body, customConfig) {
  const Authorization = cookies.get('inspector_token');
  const authHeaders = Authorization ? { Authorization } : {};
  const headers = customConfig ? { ...customConfig.headers, ...authHeaders } : { ...authHeaders };
  return axios.post(url, body, { headers, ...customConfig });
}

export function put(url, body, customConfig) {
  const Authorization = cookies.get('inspector_token');
  const authHeaders = Authorization ? { Authorization } : {};
  const headers = customConfig ? { ...customConfig.headers, ...authHeaders } : { ...authHeaders };
  return axios.put(url, body, { headers, ...customConfig });
}
