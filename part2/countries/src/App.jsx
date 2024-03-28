import { useState, useEffect } from 'react'
import View from './components/view'

import CountriesService from './services/country'

const Filter = ({keyword, onInput}) => {
  return (
    <div>
        find countries <input value={keyword} onChange={e => onInput(e.target.value)}/>
    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')

  // get data from server on first render
  useEffect(() => {
    
    CountriesService
      .getAll()
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
