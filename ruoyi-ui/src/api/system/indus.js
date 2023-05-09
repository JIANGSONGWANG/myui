import request from '@/utils/request'

// 查询indus列表
export function listIndus(query, val2) {
  return request({
    url: val2,
    method: 'get',
    params: query
  })
}

// 查询indus详细
export function getIndus(ID) {
  return request({
    url: '/system/indus/' + ID,
    method: 'get'
  })
}

// 新增indus
export function addIndus(data) {
  return request({
    url: '/system/indus',
    method: 'post',
    data: data
  })
}

// 修改indus
export function updateIndus(data) {
  return request({
    url: '/system/indus',
    method: 'put',
    data: data
  })
}

// 删除indus
export function delIndus(ID) {
  return request({
    url: '/system/indus/' + ID,
    method: 'delete'
  })
}
