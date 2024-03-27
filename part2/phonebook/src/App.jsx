import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
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

const DisplayContact = ({person, onDeleteClick}) => {
  
  return(
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) {
            console.log("running");
            onDeleteClick(person.id);
          }
        } }>
        delete
      </button>  
    </>
  
  
  )
}

const Persons = ({persons, onDeleteClick}) => {
  return (
    <div>{ persons.map(person => <DisplayContact key={person.id} person={person} onDeleteClick={onDeleteClick}/>)}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)
      })
      .catch(respose => {
        alert('Failed to retrieve data from server')
      })
  },[])


  const handleNewContact = (event) => {
    event.preventDefault()

    if (newNumber === '' || newName === '')
    {
      alert(`Please enter value.`)
      return
    }

    const match = persons.find((person) => 
                                person.name.toLowerCase() === newName.toLowerCase())

    if (match !== undefined)
    {
      if (match.number === newNumber)
      {
        alert(`Contact already exists`);
        return
      }

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one`)) {
        console.log("running");
  
        personService
          .update(match.id,{...match,number:newNumber})
          .then(updatedPerson => {
            // update view
            setPersons(persons.map(person =>
              person.id!==match.id ? person : updatedPerson))

          })
          .catch(error => {
            console.log("Error updating new number!");
          })
      }
    }
    else {

      // create new contact
      const personObj = {name: newName, number: newNumber}

      personService
        .create(personObj)
        .then(returnedPersonObj => {
          // update state value
          setPersons(persons.concat(returnedPersonObj))
        })
        .catch(error => {
          alert(`Failed to add ${newName} to server`)
        })
    }

    // reset form values
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteContact = (id) => {
    personService
      .remove(id)
      .then(respose => {
        console.log(`deletion performed on id ${id}`);
        
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {

      })

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

      <Persons persons={filteredPersons} onDeleteClick={handleDeleteContact}/>
      
    </div>
  )
}

export default App