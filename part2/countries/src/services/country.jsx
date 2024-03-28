
import axios from "axios"


const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const url = `${baseURL}/all`
    return axios.get(url)
                .then(respose => respose.data)
}

const get = (name) => {
    const url = `${baseURL}/name/${name}`
    return axios.get(encodeURI(url))
                .then(response => response.data)
}

export default {getAll , get}