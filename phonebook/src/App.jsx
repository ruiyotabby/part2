import { useState, useEffect } from 'react'
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState(persons);

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response);
      setShow(response);
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const duplicate = persons.filter(person => person.name === newName);
    if (duplicate.length > 0){
      const name = duplicate[0].name;
      const id = duplicate[0].id;
      if (window.confirm(`${name} is already added to phonebook. Replace the old number with new one?`)){
        return (personService.update(id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setShow(persons.map(person => person.id !== id ? person : returnedPerson))
        }))
      } else{
        return
      }
    }

    personService.create(personObject).then(response => {
      setPersons(persons.concat(response));
      setShow(show.concat(response));
      setNewName('');
      setNewNumber('');
    })
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value);

  const handleNumberChange = (event) => 
    setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    const filter = persons.filter(person => 
      person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    );

    if(event.target.value === ''){
      return setShow(persons);
    } else if (filter === undefined) {
      return setShow([]);
    }

    setShow(filter);
  }

  const handleDeletion =(object) => {
    if (window.confirm(`Delete ${object.name}?`)) {
      personService.remove(object.id).then(() => {
        setPersons(persons.filter(person => person.id !== object.id))
        setShow(persons.filter(person => person.id !== object.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='Filter shown with' handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        value={{name: newName, number: newNumber}} 
        handleChange={{name: handleNameChange, number: handleNumberChange}} 
        handleClick={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={show} handleChange={handleDeletion} />
    </div>
  )
}

const Persons = ({persons, handleChange}) => {
  return (
    <>
      {persons.map((person) =>
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleChange(person)}>delete</button>
        </p>
      )}
    </>
  )
}

const Filter = ({handleChange, text}) => (
  <div>
    {text} <input onChange={handleChange} />
  </div>
)

const PersonForm = ({value, handleChange, handleClick}) => (
  <form>
    <Input value={value.name} handleChange={handleChange.name} text='Name' />
    <Input value={value.number} handleChange={handleChange.number} text='Number' />
    <button type="submit" onClick={handleClick}>add</button>
  </form>
)

const Input = ({value, handleChange, text}) => (
  <div>
      {text}: <input value={value} onChange={handleChange} />
    </div>
)

export default App;