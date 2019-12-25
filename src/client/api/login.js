import { post } from './index';

export function login(body) {
  return post('/login', body);
}
