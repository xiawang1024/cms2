import request from '@/utils/request'

export function fetchSensitiveList(word, pageNo, pageSize) {
  let selectWord = word ? word : ''
  return request({
    url: '/news-comment/sensitive-words/select-page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&word=' + selectWord,
    method: 'get',
  })
}

export function getSensitive(id) {
  return request({
    url: '/news-comment/sensitive-words/' + id,
    method: 'get'
  })
}

export function createSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/save',
    method: 'post',
    data
  })
}
export function importSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/import-excel',
    method: 'post',
    data
  })
}
export function updateSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/update',
    method: 'put',
    data
  })
}
export function deleteSensitive(id) {
  return request({
    url: `/news-comment/sensitive-words/${id}`,
    method: 'delete'
  })
}