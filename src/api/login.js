import { getPro, postPro, getCache } from './base.js'

export function login(data) {
  const url = "/auth/login";
  return postPro(url, data);
}

export function logout(data) {
  const url = "/auth/logout";
  return postPro(url);
}

export function userInfo() {
  const url = '/auth/info'
  return getPro(url)
}