import { useState } from 'react'


const DisplayContact = ({person}) => {
  return(<p>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')


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

  const filteredPersons = filterInput === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filterInput.toLowerCase()))

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>
        filter shown with <input value={filterInput} onChange={e => setFilterInput(e.target.value)}/>
      </div>

      <h2>add a new</h2>
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

      <div>{ filteredPersons.map(person => <DisplayContact key={person.name} person={person}/>)}</div>
      
    </div>
  )
}

export default App