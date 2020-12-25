import request from '@/utils/request'

/**
 * 用户登陆
 */
export const reqMemberLogin = (data, params) => {
  return request({
    method: 'post',
    url: '/api/member/login',
    data,
    params
  })
}


/**
 * 发送短信
 */
export const reqGeneratePhoneCode = (params) => {
  return request({
    method: 'post',
    url: '/api/member/creatPhoneCode',
    params
  })
}

/**
 * 校验验证码
 */
export const reqGenerateCheckPhoneCode = (params) => {
  return request({
    method: 'post',
    url: '/api/usermethod/CheckPhoneCode',
    params
  })
}
/**
 * 获取证书信息
 */
export const reqMemberesList = params => {
  return request({
    url: '/api/classMembers',
    method: 'get',
    params
  })
}

/**
 * 获取用户信息
 */
export const reqMemberByID = id => {
  return request({
    url: '/api/members/' + id,
    method: 'get'
  })
}
/**
 * 用户的证书详情
 */
export const reqClassMembersByID = id => {
  return request({
    url: '/api/classMembers/' + id,
    method: 'get'
  })
}
