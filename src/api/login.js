import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api-admin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api-admin/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api-admin/user',
    method: 'get',
    params: { token }
  })
}

