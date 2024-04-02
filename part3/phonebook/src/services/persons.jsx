import axios from "axios";
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL)
                .then(respose => respose.data)
}

const create = (newObj) => {
    return axios.post(baseURL, newObj)
                .then(respose => respose.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, data) => {
    return axios.put(`${baseURL}/${id}`,data)
                .then(respose => respose.data)
}

export default { getAll, create, remove, update }