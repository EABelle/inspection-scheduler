import { post } from './index'

export function login(body) {
    return post('/api/login', body)
}
