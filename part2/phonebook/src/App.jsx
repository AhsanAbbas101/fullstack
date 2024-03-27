import { useState, useEffect } from 'react'
import axios from 'axios'



const Filter = ({keyword, onInput}) => {
  return (
    <div>
        filter shown with <input value={keyword} onChange={e => onInput(e.target.value)}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onFormSubmit}>
    <div>
      name: <input value={props.nameValue} onChange={e => props.onNameChange(e.target.value)}/>
    </div>
    <div>
      number: <input value={props.numberValue} onChange={e => props.onNumberChange(e.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const DisplayContact = ({person}) => {
  return(<p>{person.name} {person.number}</p>)
}

const Persons = ({persons}) => {
  return (
    <div>{ persons.map(person => <DisplayContact key={person.id} person={person}/>)}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])


  const handleNewContact = (event) => {
    event.preventDefault()


    const personExists = () => {
      const match = persons.find((person) => 
                                  person.name.toLowerCase() === newName.toLowerCase())
      return match !== undefined
    }

    if (personExists())
    {
      alert(`${newName} is already added to phonebook.`)
      return
    }

    if (newNumber === '')
    {
      alert(`Please enter a number.`)
      return
    }

    // create new contact
    const personObj = {name: newName, number: newNumber}

    // add new contact
    setPersons(persons.concat(personObj))

    // reset form values
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = filterInput === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filterInput.toLowerCase()))

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter keyword={filterInput} onInput={setFilterInput}/>

      <h3>add a new</h3>
      <PersonForm onFormSubmit={handleNewContact}
        nameValue={newName} onNameChange={setNewName}
        numberValue={newNumber} onNumberChange={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons}/>
      
    </div>
  )
}

export default App