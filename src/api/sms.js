import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/sms',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/sms',
    data,
    method: 'put'
  })
}

export function send(data) {
  return request({
    url: 'api/sms',
    data,
    method: 'post'
  })
}
