import { get } from './base.js'
export function userInfo() {
  const url = '/api/user_info'
  const useRoot = false
  return get(url, useRoot)
}