function Country (props) {
  return (
    <div
      style={{
        marginTop: '1rem'
      }}
    >
      <h2>{props.countrie.name}</h2>
      <p>capital: {props.countrie.capital}</p>
      <p>population: {props.countrie.population}</p>
      <h3>languajes</h3>
      <ul>
        {props.countrie.languages.map((lan) => {
          return <li key={props.countrie.name + lan.name}>{lan.name}</li>
        })}
      </ul>
      <img
        src={props.countrie.flag}
        alt={props.countrie.name}
        style={{
          width: '130px'
        }}
      />
    </div>
  )
}

export default Country
