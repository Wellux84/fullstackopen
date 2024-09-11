import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const PersonForm = (props) => (
  <form onSubmit={props.addName} >
  <div>
    name:
     <input 
        value={props.newName}
        onChange={props.handleNameChange}
     />
  </div>
  <div>
    number:
     <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
     />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Filter = (props) => (
  <div>
  filter shown with
   <input 
      value={props.filters}
      onChange={props.handleFilterChange}
      />
</div>
)

const Persons = (props) => {
 
  return (
    <li>{props.name} {props.number}
    <button onClick={props.delButton}>Delete</button>
    </li>

  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setFilters] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

const addName = (event) => {
  event.preventDefault() 

  const existingPerson = persons.find(person => person.name === newName)

  const nameObject = {
    name: newName,
    number: newNumber
  }
  
  if (existingPerson) {  
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(existingPerson.id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
      }
  else {
    personService
    .create(nameObject)
    .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    })

  }
}

const filteredPersons = persons.filter(person => 
  person.name.toLowerCase().includes(filters.toLowerCase())
)

const delfunction = (id, name) => {
  if (window.confirm('Do you want to delete name ' + name)) {
  window.open(
  personService
  .delPerson(id)
    .then(() => {
    setPersons(persons.filter(person => person.id !== id))
  }))
}
}
const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleFilterChange = (event) => {
  setFilters(event.target.value)
}
console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filters={filters} handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm 
         addName={addName} newName={newName} handleNameChange={handleNameChange}
         newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ul>
          {filteredPersons.map(persons => 
          <Persons key={persons.id} name={persons.name} number={persons.number}
          delButton={() => delfunction(persons.id, persons.name)} 
          />
        )}
      </ul>
      </div>
  )
}

export default App

