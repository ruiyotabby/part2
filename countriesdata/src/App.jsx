import './App.css';
import { useState, useEffect } from "react";
import countryService from "./services/country";
import weatherService from "./services/weather";


function App() {
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState(countries)

  const handleChange = (e) => {
    const value = e.target.value;
    let returned = countries.filter(country => (country.toLowerCase().includes(value.toLowerCase())))

    if (returned.length === 1) {
      countryService.get(returned[0]).then(async (response) => {
        await weatherService.get(response).then(res=> {
          response.weather = res
        }).catch(err => alert(err))
        setDisplay(response)
      }).catch(err => alert(err))
    } else {
      setDisplay(returned)
    }
  }

  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.map(i => i.name.common))
      setDisplay(response.map(i => i.name.common))
    }).catch(err => alert(err))
  }, [])
  
  return (
    <div className="App">
      <label>find countries: </label>
      <input onChange={handleChange}/>
      <Display countries={display} />
    </div>
  );
}

const Display = ({countries}) => {

  if (countries.length > 10){
    return <p>Too many matches, please specify filter</p>
  } else if(countries.length === undefined) {
    const country = countries
    return (
      <Data country={country} />
    )
  }

  return (
    countries.map((country, id) => (
      <>
        <p key={id}>
          {country} 
        </p>
      </>
    ))
  )
}

const Data = ({country}) => {

  const icon = country.weather.weather[0].icon
  
  return (
    <div>
        <h1>{country.name.common} </h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        <ul>
          { Object.keys(country.languages).map((obj, i) => (
            <li key={i}>{country.languages[obj]}</li>
           ) )
          }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {Math.round(country.weather.main.temp - 273)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <p>Wind {country.weather.wind.speed} m/s</p>
      </div>
  )
}

export default App;
