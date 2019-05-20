import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/tencentConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/tencentConfig',
    data,
    method: 'put'
  })
}

export function del(id) {
  return request({
    url: 'api/tencentContent/' + id,
    method: 'delete'
  })
}

export function download(id) {
  return request({
    url: 'api/tencentContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/tencentContent/synchronize',
    method: 'post'
  })
}
