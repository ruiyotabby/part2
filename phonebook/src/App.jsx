import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '011-4440014', id: 1 },
    { name: 'kevin', number: '123-456789', id: 2 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const duplicate = persons.filter(person => person.name === newName);
    if (duplicate.length > 0){
      const name = duplicate[0].name;
      return (alert(`${name} is already added to phonebook`));
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(personObject));
    setShow(show.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value);

  const handleNumberChange = (event) => 
    setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    const filter = persons.find(person => 
      person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    );

    if(event.target.value === ''){
      return setShow(persons);
    } else if (filter === undefined) {
      return setShow([]);
    }

    setShow([filter]);
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
      <Persons persons={show} />
    </div>
  )
}

const Persons = ({persons}) => (
  <>
    {persons.map((person) =>
      <p key={person.id}>{person.name} {person.number}</p>
    )}
  </>
)

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