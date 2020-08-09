import { get } from './base.js'
// test mock
export function mock_login() {
  const url = '/api/login'
  const useRoot = false
  return get(url, useRoot)
}