import axios from 'axios'

const get = (country) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[0]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
  return request.then(res => res.data)
}

export default { get }