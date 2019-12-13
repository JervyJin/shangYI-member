import axios from 'axios'
import store from './store'
import { getToken } from '@/util/token'
import qs from 'qs'
import config from './config'
import router from './router'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import { Notify,Toast } from 'vant'

console.log(config)

// 创建axios实例
const http = axios.create({
  baseURL: config.api_base,
  timeout: 15000,

  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type' : 'application/json',
  }
})

// request拦截器
http.interceptors.request.use(config => {
  config.data = config.data ? config.data : {}
  config.headers["authorization"] =store.state.token;
  if(config.method=='get'){
    Toast({
      mask: false,
      message: '加载中...',
      position: 'bottom'
    });
  }else{
    Toast.loading({
      mask: true,
      message: '加载中...',
      position: 'middle',
      loadingType:'spinner'
    });
  }
  if (router.currentRoute && router.currentRoute.meta.requiresAuth) {
    if (localStorage.getItem('user')) {
      return Promise.reject('请登录后操作')
    } else {

      // config.headers.Authorization = token;

      // config.headers['authorization'] = `${store.state.token}`;
        console.log('interceptors config=',config)
      return config
    }
  } else {
    return config
  }
})

// respone拦截器
http.interceptors.response.use(
  response => {
    let data = response.data

    let msg = data.message || ''
    Toast.clear();
    if (response.status === 200) {
      if (response.data.Result) {
        if (response.data.Result.Code && response.data.Result.Code !== 0) {
          Notify({ type: 'danger', message: response.data.Result.Message, duration: 1500 })
          return Promise.resolve(response.data)
        } else {
          return Promise.resolve(response.data)
        }
      }else
      {
        return Promise.resolve(response.data)   
      }
    } else {
      Notify({ type: 'danger', message: '请求失败,请稍后再试!!!', duration: 1500 })
      return Promise.reject(response)
    }

    // if (data.code == 401) {
    //   // 账号禁用
    //   Vue.toasted.error(data.message, { icon: 'error' }).goAway(2000)
    //   router.replace({ name: 'login' })
    //   return Promise.reject(new Error(msg))
    // } else if (data.code == 403) {
    //   // 登录失效 需重新登录
    //   Vue.toasted.error('登录失效 需重新登录', { icon: 'error' }).goAway(2000)
    //   router.replace({ name: 'login' })
    //   return Promise.reject(new Error(msg))
    // } else if (data.code == 400) {
    //   return Promise.reject(new Error(msg))
    // }
    // return data
  },
  err => {
    Toast.clear();
    if (err.response.data.Error) {
      Notify({ type: 'danger', message: err.response.data.Error.Message, duration: 1500 })
      if(err.response.status == 401 || (err.response.data.Error && err.response.data.Error.Code)){
        console.log(router)
        store.commit("setToken", '');
        router.push({
            path: "/login",
            query:{
              redirect:router.currentRoute.fullPath
            }
        });
      }
    } else {
      Notify({ type: 'danger', message: '请求失败!!!', duration: 1500 })
    }
    return Promise.reject(err)
  }
)

export default http
