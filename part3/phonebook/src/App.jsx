import { useState, useEffect } from 'react'
import personService from './services/persons'

import './styles/notification.css'

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
  
  const divstyleobj = { display: 'flex', alignItems: 'center'}
  const pstyleobj = { marginRight: 10}
  return(
    <div style={divstyleobj}>
      <p style={pstyleobj}>{person.name} {person.number}</p>
      <button onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) {
            onDeleteClick(person.id);
          }
        } }>
        delete
      </button>  
    </div>
  
  
  )
}

const Persons = ({persons, onDeleteClick}) => {
  return (
    <div>{ persons.map(person => <DisplayContact key={person.id} person={person} onDeleteClick={onDeleteClick}/>)}</div>
  )
}

const Notification = ({notification}) => {

  if (notification === null) {
    return null
  }

  const {positive, msg} = notification
  const msgstyle = {color: positive ? 'green': 'red'}
  return (
    <div className='error' style={msgstyle}> {msg} </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [noificationMsg, setNoificationMsg] = useState(null)


  const disableNotification = (delay) => {
    setTimeout(() => {
      setNoificationMsg(null)
    }, delay)
  }
  const enableNotification = (positive, msg, delay=5000) => {
    
    setNoificationMsg({
      positive:positive,
      msg:msg
    })
    disableNotification(delay)     
  }

  useEffect(() => {
    // get all numbers from json-server 
    personService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)
      })
      .catch(respose => {
        enableNotification(false,'Failed to retrieve data from server')
      })
  },[])


  const handleNewContact = (event) => {
    event.preventDefault()

    const nameInput = newName.trim()
    const numberInput = newNumber.trim()

    if (numberInput === '' || nameInput === '')
    {
      enableNotification(false,'Please enter value.')
      return
    }

    const match = persons.find((person) => 
                                person.name.toLowerCase() === nameInput.toLowerCase())

    if (match !== undefined)
    {
      if (match.number === numberInput)
      {
        enableNotification(false,'Contact already exists.')
        return
      }

      if (window.confirm(`${nameInput} is already added to the phonebook, replace the old number with a new one`)) {
        console.log("running");
  
        personService
          .update(match.id,{...match,number:numberInput})
          .then(updatedPerson => {
            // update view
            setPersons(persons.map(person =>
              person.id!==match.id ? person : updatedPerson))

            enableNotification(true, `${nameInput} updated successfully.` )
          })
          .catch(error => {
            enableNotification(false,'Error updating new number. | ' + error.response.data.error)
          })
      }
    }
    else {

      // create new contact
      const personObj = {name: nameInput, number: numberInput}

      personService
        .create(personObj)
        .then(returnedPersonObj => {
          // update state value
          setPersons(persons.concat(returnedPersonObj))

          enableNotification(true, `${nameInput} added successfully.` )
        })
        .catch(error => {
          enableNotification(false,`Failed to add ${nameInput} to server | ` + error.response.data.error)
        })
    }

    // reset form values
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteContact = (id) => {
    
    const match = persons.find(person => person.id === id)
    
    personService
      .remove(id)
      .then(respose => {
        console.log(`deletion performed on id ${id}`);
        
        setPersons(persons.filter(person => person.id !== id))

        enableNotification(true, `${match.name} deleted successfully.` )
      })
      .catch(error => {
        enableNotification(false,`Failed to delete ${match.name} from server`)
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
      
      <Notification notification={noificationMsg}/>

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