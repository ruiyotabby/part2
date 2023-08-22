import axios from 'axios'

const allUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`
const singleUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
  const request = axios.get(allUrl)
  return request.then(response => response.data)
}

const get = (country) => {
  const request = axios.get(`${singleUrl}/${country}`)
  return request.then(response => response.data)
}

export default { getAll, get }