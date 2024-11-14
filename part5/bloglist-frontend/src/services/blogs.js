import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token=null) => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject,token=null) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create }