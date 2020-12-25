
const TOKENKEY = 'TOKEN_DANCERS'
const UERSINFO = 'USER_INFO'
/**
 * 存入token
 */
export function getToken() {
  return window.sessionStorage.getItem(TOKENKEY)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TOKENKEY, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TOKENKEY)
}

export function getUserInfo() {
  return JSON.parse(window.sessionStorage.getItem(UERSINFO))
}

export function setUserInfo(user) {
  return window.sessionStorage.setItem(UERSINFO, JSON.stringify(user))
}

export function removeUserInfo() {
  return window.sessionStorage.removeItem(UERSINFO)
}