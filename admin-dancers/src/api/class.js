import request from '@/utils/request'

/**
 * @param {} params
 * 课程列表CRUD
 */
export const reqClassInfoesList = params => {
  return request({
    url: '/api/classInfoes',
    method: 'get',
    params
  })
}

export const reqClassInfoesByID = id => {
  return request({
    url: '/api/classInfoes/' + id,
    method: 'get'
  })
}

export const reqClassInfoesAdd = data => {
  return request({
    url: '/api/classInfoes',
    method: 'post',
    data
  })
}

export const reqClassInfoesUpload = (data, id) => {
  return request({
    url: '/api/classInfoes/' + id,
    method: 'put',
    data
  })
}

export const reqClassInfoesDetele = id => {
  return request({
    url: '/api/classInfoes/' + id,
    method: 'delete'
  })
}

/**
 * @param {} params
 * 证书类别CRUD
 */
export const reqCertificateList = params => {
  return request({
    url: '/api/classCertificates',
    method: 'get',
    params
  })
}

export const reqCertificateByID = id => {
  return request({
    url: '/api/classCertificates/' + id,
    method: 'get'
  })
}

export const reqCertificateAdd = data => {
  return request({
    url: '/api/classCertificates',
    method: 'post',
    data
  })
}

export const reqCertificateUpload = (data, id) => {
  return request({
    url: '/api/classCertificates/' + id,
    method: 'put',
    data
  })
}

export const reqCertificateDetele = id => {
  return request({
    url: '/api/classCertificates/' + id,
    method: 'delete'
  })
}

/**
 * 学员管理
 */
export const reqClassMembersList = params => {
  return request({
    url: '/api/classMembers',
    method: 'get',
    params
  })
}

export const reqClassMembersByID = id => {
  return request({
    url: '/api/classMembers/' + id,
    method: 'get'
  })
}

export const reqClassMembersAdd = data => {
  return request({
    url: '/api/classMembers',
    method: 'post',
    data
  })
}

export const reqClassMembersUpload = (data, id) => {
  return request({
    url: '/api/classMembers/' + id,
    method: 'put',
    data
  })
}

export const reqClassMembersDetele = id => {
  return request({
    url: '/api/classMembers/' + id,
    method: 'delete'
  })
}

/**
 * 考核等级
 */

export const reqClassLevelList = params => {
  return request({
    url: '/api/assessmentLevels',
    method: 'get',
    params
  })
}

export const reqClassLevelByID = id => {
  return request({
    url: '/api/assessmentLevels/' + id,
    method: 'get'
  })
}

export const reqClassLevelAdd = data => {
  return request({
    url: '/api/assessmentLevels',
    method: 'post',
    data
  })
}

export const reqClassLevelUpload = (data, id) => {
  return request({
    url: '/api/assessmentLevels/' + id,
    method: 'put',
    data
  })
}

export const reqClassLevelDetele = id => {
  return request({
    url: '/api/assessmentLevels/' + id,
    method: 'delete'
  })
}
