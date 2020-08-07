import { get, getInCache } from './base.js'

export function userInfo() {
  const url = '/auth/info'
  return get(url)
}

export function testInCache() {
  const url = '/auth/info'
  return getInCache(url)
}

// test mock api
export function testMock() {
  const url = '/api/data'
  const useRoot = false
  return get(url, useRoot)
}
export default {}