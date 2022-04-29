function Countries (props) {
  return (
    <div
      style={{
        marginTop: '1rem'
      }}
    >
      {props.countries.map((country) => {
        return (
          <div key={country.name}>
            <span>{country.name}</span>{' '}
            <button onClick={props.handleShowCountry} value={country.name}>
              show
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Countries
