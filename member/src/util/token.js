import store from '@/store'

export function getToken() {
  return store.state.token
}

/**
 * 根据参数名获取地址栏参数
 * @param name 参数名字
 * @returns {*}
 */
export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
