import request from '@/utils/request'

/**
 * @param {*} data
 * 上传图片
 */
export const reqUpload = (data) => {
  return request({
    url: '/api/Upload',
    method: 'post',
    data
  })
}
/**
 * @param {*} params
 * 获取省份
 */
export const reqRegionals = (params) => {
  return request({
    url: '/api/Regionals',
    method: 'get',
    params
  })
}

/**
 * 下载附件/api/DownloadFile
 */

export const reqDownloadFile = (params) => {
  return request({
    url: '/api/DownloadFile',
    method: 'get',
    responseType: 'blob',
    params
  })
}
