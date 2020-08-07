import { get } from './base.js'
export function login() {
  const url = '/api/login'
  const useRoot = false
  return get(url, useRoot)
}