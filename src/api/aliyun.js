import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/aliYunConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/aliYunConfig',
    data,
    method: 'put'
  })
}

export function del(id) {
  return request({
    url: 'api/aliYunContent/' + id,
    method: 'delete'
  })
}

export function download(id) {
  return request({
    url: 'api/aliYunContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/aliYunContent/synchronize',
    method: 'post'
  })
}
