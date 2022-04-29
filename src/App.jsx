import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './Components/Countries.jsx'
import Country from './Components/Country'

function App () {
  const [countries, setcountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchCountry = (e) => {
    const country = e.target.value
    setSearchCountry(country)
  }

  const handleShowCountry = (e) => {
    const country = e.target.value
    setSearchCountry(country)
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
      })
      .catch((e) =>
        console.log(`%c${e.message}`, 'color: orange; font-size: 14px')
      )
  }, [searchCountry])

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
        ></Countries>
      )}
      {countries.length === 1 && <Country countrie={countries[0]}></Country>}
    </div>
  )
}

export default App
