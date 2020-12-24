
const TokenKey = 'training-admin'
const UserInfo = 'training-admin-userinfo'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  window.sessionStorage.clear()
}

export function getUserInfo() {
  return JSON.parse(window.sessionStorage.getItem(UserInfo)) || null
}

export function setUserInfo(info) {
  window.sessionStorage.setItem(UserInfo, JSON.stringify(info))
}

export function removeUserInfo() {
  window.sessionStorage.clear()
}
