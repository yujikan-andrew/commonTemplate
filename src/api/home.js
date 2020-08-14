import { get } from './base.js'
// test mock
export function homeList() {
  const url = '/api/home_list'
  const useRoot = false
  return get(url, useRoot)
}