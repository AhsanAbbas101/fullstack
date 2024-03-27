import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
                .then(respose => respose.data)
}

const create = (newObj) => {
    return axios.post(baseURL, newObj)
                .then(respose => respose.data)
}

const remove = (idObj) => {
    return axios.delete(`${baseURL}/${idObj}`)
}

export default { getAll, create, remove }