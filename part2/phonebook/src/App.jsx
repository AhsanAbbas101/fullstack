import { useState } from 'react'


const DisplayName = ({name}) => {
  return(<p>{name}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewContact = (event) => {
    event.preventDefault()


    const personExists = () => {
      const match = persons.find((person) => 
                                  person.name.toLowerCase() === newName.toLocaleLowerCase())
      return match !== undefined
    }

    if (personExists())
    {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // create new contact
    const personObj = {name: newName}

    // add new contact
    setPersons(persons.concat(personObj))

    // reset form values
    setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>{ persons.map(person => <DisplayName key={person.name} name={person.name}/>)}</div>
      
    </div>
  )
}

export default App