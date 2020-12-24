import request from '@/utils/request'

/**
 * @param {} params
 * 会员列表
 */
export const reqMemberesList = params => {
  return request({
    url: '/api/members',
    method: 'get',
    params
  })
}

export const reqMemberByID = id => {
  return request({
    url: '/api/members/' + id,
    method: 'get'
  })
}

export const reqMemberAdd = data => {
  return request({
    url: '/api/members',
    method: 'post',
    data
  })
}

export const reqMemberUpload = (data, id) => {
  return request({
    url: '/api/members/' + id,
    method: 'put',
    data
  })
}

export const reqMemberDetele = id => {
  return request({
    url: '/api/members/' + id,
    method: 'delete'
  })
}
