import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '011-4440014', id: 1 },
    { name: 'kevin', number: '123456', id: 2 }
  ]) ;
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

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
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
      <div>
        Filter shown with <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {show.map((person) => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App;