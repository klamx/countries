import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './Components/Countries.jsx'
import Country from './Components/Country'

function App () {
  const [countries, setcountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [isOneCountry, setIsOneCountry] = useState({ is: false, capital: '' })
  const [weather, setWeather] = useState({
    temp: '',
    img: '',
    wind: '',
    dir: '',
    alt: '',
    speed: ''
  })

  const handleSearchCountry = (e) => {
    const country = e.target.value
    setSearchCountry(country)
    if (countries.length === 1) {
      setIsOneCountry({ is: true, capital: countries[0].capital })
    } else {
      setIsOneCountry({ is: false, capital: '' })
    }
  }

  const handleShowCountry = (e) => {
    const country = e.target.value
    setSearchCountry(country)
    setIsOneCountry({ is: true, capital: countries[0].capital })
  }

  useEffect(() => {
    if (searchCountry === '') return

    const getCountriesData = async () => {
      const response = await axios(
        `https://restcountries.com/v2/name/${searchCountry}`
      )
      return response
    }
    getCountriesData()
      .then(({ data }) => {
        setcountries(data)
        if (data.length === 1) {
          setIsOneCountry({ is: true, capital: data[0].capital })
        }
      })
      .catch((e) =>
        console.log(`%c${e.message}`, 'color: orange; font-size: 14px')
      )
  }, [searchCountry])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    if (!isOneCountry.is) return
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${isOneCountry.capital}&aqi=no`
    setIsOneCountry({ is: false, capital: '' })
    axios.get(url).then(({ data }) => {
      setWeather({
        temp: data.current.temp_c,
        wind: data.current.wind_mph,
        dir: data.current.wind_dir,
        img: data.current.condition.icon,
        alt: data.current.condition.text,
        speed: data.current.wind_mph
      })
    })
  }, [isOneCountry])

  return (
    <div>
      <div>
        find countries:{' '}
        <input
          type='text'
          placeholder='Search'
          value={searchCountry}
          onChange={handleSearchCountry}
        />
      </div>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countries.length <= 10 && countries.length > 1 && (
        <Countries
          countries={countries}
          handleShowCountry={handleShowCountry}
        />
      )}
      {countries.length === 1 && (
        <Country weather={weather} country={countries[0]} />
      )}
    </div>
  )
}

export default App
