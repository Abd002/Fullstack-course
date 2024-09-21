import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterShow, setfilterShow] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    personsService.getAll().then(response => {
      setPersons(response)
      setPersonsFiltered(response)
      console.log(response)
    })
  },[])

  const SendNotification=(message, name)=>{
    setMessage(
      `${message} ${name}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addName=(event)=>{
    event.preventDefault()

    let foundName = persons.find((element)=> element.name === newName)
    
    if(foundName === undefined){

      let newPerson = {name:newName, number:newNumber}

      let newPersons = persons.concat(newPerson)

      personsService.create(newPerson).then(response => response).catch(error => {
        alert("Error", error)
      })

      SendNotification("Added", newPerson.name)

      setPersons(newPersons)
      setPersonsFiltered(newPersons)
    }else{
      const userConfirmed = confirm("Do you want to relace old number ?");

      if(userConfirmed){
        let object = persons.find(n => n.name === newName)
        let newObject ={...object, number:newNumber}
        SendNotification("Eddited", newObject.name)
        console.log(object)

        personsService.update(newObject.id, newObject).then(response =>{
          setPersons(persons.map(n=>n.id !== newObject.id ? n : response))
          setPersonsFiltered(persons.map(n=>n.id !== newObject.id ? n : response))
        })

        

      }
    }

    setNewName('')
    setNewNumber('')
    setfilterShow('')
  }

  const deleteContact=(id)=>{
    const userConfirmed = confirm("Do you want to relace old number ?");
    if(userConfirmed){
      personsService.deleteOne(id).catch(error=>{
        SendNotification("Error", '')
      })
      setPersons(persons.filter(n=>n.id !== id))

      setfilterShow('')
      setPersonsFiltered(persons.filter(n=>n.id !== id))
    }

  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilterShow=(event)=>{
    let filteredStrings = persons.filter(str => 
      str.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    console.log(filteredStrings)
    setPersonsFiltered(filteredStrings)

    setfilterShow(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}/>

      <Filter handleFilterShow={handleFilterShow} filterShow={filterShow} />

      <h2>Add a new</h2>

      <PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber}/>

      <h2>Numbers</h2>

      <Persons personsFiltered={personsFiltered} deleteContact={deleteContact}/>

    </div>
  )
}

const Filter=({handleFilterShow, filterShow})=>{
  return (
    <div>
      filter shown with <input onChange={handleFilterShow} value={filterShow}/>
    </div>
  )
}

const PersonForm =({addName, handleNameChange, newName, handleNumberChange, newNumber})=>{
  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber}/>
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const Persons =({personsFiltered, deleteContact})=>{
  return (
    <>
      {personsFiltered.map((value, i)=>
        <div key={i}> 
          <p>{value.name} {value.number}  
            <button onClick={()=>deleteContact(value.id)}>delete</button>
          </p>
        </div>
      )}
    </>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const errorStyle = {
    color: "green",
    background: "lightgreen",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message.toLowerCase().includes("error")){
    errorStyle.color="red"
    errorStyle.background="lightgrey"
  }
  
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}


export default App