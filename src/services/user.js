import request from '@/utils/request';
import { post } from '@/utils/httpRequest';
import { ipServer } from '@/utils/utils';

export async function login(params) {
  return post(`${ipServer}/api/user/login`, params);
}

export async function register(params) {
  return post(`${ipServer}/api/user/signup`, params);
}
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
