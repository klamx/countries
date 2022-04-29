import axios from 'axios'
import { useEffect, useState } from 'react'

function App () {
  const [countries, setcountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchCountry = (e) => {
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
    getCountriesData().then(({ data }) => {
      console.log('render')
      setcountries(data)
    })
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
      {countries.length <= 10 && (
        <div style={{ marginTop: '1rem' }}>
          {countries.map((contry) => {
            return (
              <div key={contry.name}>
                <span>{contry.name}</span>
              </div>
            )
          })}
        </div>
      )}
      {countries.length === 1 && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{countries[0].name}</h2>
          <p>capital: {countries[0].capital}</p>
          <p>population: {countries[0].population}</p>
          <h3>languajes</h3>
          <ul>
            {countries[0].languages.map((lan) => {
              return <li key={countries[0].name + lan.name}>{lan.name}</li>
            })}
          </ul>
          <img
            src={countries[0].flag}
            alt={countries[0].name}
            style={{ width: '130px' }}
          />
        </div>
      )}
    </div>
  )
}

export default App
