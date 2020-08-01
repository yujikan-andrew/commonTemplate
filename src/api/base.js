import axios from "axios";
import store from "@/store";
import {getToken} from '@/utils/cookie.js'

const rootUrl = process.env.VUE_APP_BASE_API;

const post = (url, data, useRoot = true)=> {
  var header = {
    "content-type": "application/json",
    Authorization: getToken(),
  };
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
  var axiosXhr = axios
    .post(useRoot ? rootUrl + url : url, data, {
      headers: header,
      cancelToken: source.token,
    })
    .catch(requestError);

  axiosXhr.cancelRequest = source.cancel;

  return axiosXhr;
};
const get = (url, useRoot = true)=> {
  var header = {
    "content-type": "application/json",
    Authorization: getToken(),
  };
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
  var axiosXhr = axios
    .get(useRoot ? rootUrl + url : url, {
      headers: header,
      cancelToken: source.token,
    })
    .catch(requestError);

  axiosXhr.cancelRequest = source.cancel;
  return axiosXhr;
};
const getInCache = (url, useRoot = true)=> {
  return getCacheData(url, useRoot);
};
const requestError = (response)=> {
  store.commit("LOGOUT");
  // location.reload()
  console.log(response.message);
};

const getCacheData = (url, useRoot)=> {
  window.memoryCache = window.memoryCache ? window.memoryCache : {};
  
  let promise = null,
    cacheData = window.memoryCache[url];

  if (cacheData) {
    promise = new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(cacheData);
        });
      } catch(e) {
        reject()
      }
    });
  } else {
    promise = window.memoryCache[url] = get(url, useRoot);
  }
  return promise;
}

export {
  post,
  get,
  getInCache
}