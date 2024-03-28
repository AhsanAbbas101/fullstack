import axios from "axios"

//($env:VITE_WEATHER_API_KEY="") -and (npm run dev)
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather' 

const get = (city) => {

    const url = `${baseUrl}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    return axios.get(encodeURI(url))
                .then(response => response.data)
}

const getImageUrl = (id) => {
    return `https://openweathermap.org/img/wn/${id}@2x.png`
}

export default { get, getImageUrl }