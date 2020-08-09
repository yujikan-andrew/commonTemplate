import { getPro, postPro, getCache } from './status.js'

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


// test mock
export function mock_login() {
  const url = '/api/login'
  const useRoot = false
  return get(url, useRoot)
}