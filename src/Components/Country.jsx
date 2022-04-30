function Country (props) {
  return (
    <div
      style={{
        marginTop: '1rem'
      }}
    >
      <h2>{props.country.name}</h2>
      <p>capital: {props.country.capital}</p>
      <p>population: {props.country.population}</p>
      <h3>languajes</h3>
      <ul>
        {props.country.languages.map((lan) => {
          return <li key={props.country.name + lan.name}>{lan.name}</li>
        })}
      </ul>
      <img
        src={props.country.flag}
        alt={props.country.name}
        style={{
          width: '130px'
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Weather in {props.country.capital}</h3>
        <div>
          <b>temperature:</b> {props.weather?.temp} Celcius
        </div>
        <img
          src={props.weather.img}
          alt={props.alt}
          style={{ width: '70px' }}
        />
        <div>
          <b>wind:</b> {props.weather.speed} mph direction {props.weather.dir}
        </div>
      </div>
    </div>
  )
}

export default Country
