import { useState } from 'react'


const DisplayContact = ({person}) => {
  return(<p>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewContact = (event) => {
    event.preventDefault()


    const personExists = () => {
      const match = persons.find((person) => 
                                  person.name.toLowerCase() === newName.toLowerCase())
      return match !== undefined
    }

    if (personExists())
    {
      alert(`${newName} is already added to phonebook`)
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

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewContact}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>{ persons.map(person => <DisplayContact key={person.name} person={person}/>)}</div>
      
    </div>
  )
}

export default App