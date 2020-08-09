import { get, post, getInCache } from './base.js'

const getPro = async (url, useRoot = true)=> {
  var res = await get(url, useRoot)

  if (res.status && res.data.success) {
    return res.data.data
  } else {
    // 需考虑是暂无数据，还是发生错误
    console.error(res.data)
    return false
  }
};

const postPro = async (url, data, useRoot = true)=> {
  var res = await post(url, data, useRoot)
  if (res.status && res.data.success) {
    return res.data.data
  } else {
    console.error(res.data)
    return false
  }
};

const getCache =  async (url, useRoot = true)=> {
  var res = await getInCache(url, useRoot)

  if (res.status && res.data.success) {
    return res.data.data
  } else {
    console.error(res.data)
    return false
  }
};

export {
  getPro,
  getCache,
  postPro
}
