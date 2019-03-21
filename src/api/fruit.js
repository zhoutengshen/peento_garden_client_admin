import request from '@/utils/request'
export const fetchFruitDetails = ({ limit, offset }) => request({
  url: `/api/fruit/details?limit=${limit}&offset=${offset}`,
  method: 'GET'
})
export const uploadImg = formData => request({
  url: '/api/upload/img',
  data: formData,
  method: 'POST'
})

export const updateFruit = ({ values, id }) => {
  return request({
    url: '/api-admin/fruit',
    data: {
      values,
      id
    },
    method: 'PUT'
  })
}
export const addFruit = ({ values }) => {
  return request({
    url: '/api-admin/fruit',
    data: {
      values
    },
    method: 'POST'
  })
}
