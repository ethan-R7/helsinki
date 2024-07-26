import { useState } from "react"
import personService from '../services/persons'
const PersonForm = ({persons, setPersons, setShowResults, setNotification, setNotificationType}) => {
    const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

    const handleNameInput = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNumberInput = (event) => {
        setNewNumber(event.target.value)
      }

    // Move to app
      const addPerson = (event) => {
        event.preventDefault()
        if (persons.filter((person) => person.name === newName).length !== 0){
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const personObj = persons.find((person) => person.name === newName)
            const personId = personObj.id

            const updatedPersonObj = {
              ...personObj,
              number: newNumber
              
            }
            // console.log('updatedPerson:')
            personService
              .update(personId, updatedPersonObj)
              .then( () => {
                
               
                const newPersons = persons.map( (person) => person.id !== personId ? person : updatedPersonObj)
                
                setShowResults(newPersons)
                setPersons(newPersons)
                setNewName('')
                setNewNumber('')
                
              })
              .then( success => {
                setNotification(
                `Updated '${personObj.name}' successfully`
              )
              setNotificationType('success')
              setTimeout(()=> {
                setNotification(null)
                setNotificationType(null)
              }, 5000)
            }
              )
              .catch(
                error => {
                  setNotification(
                  `'${personObj.name}' has already been removed from the server`
                )
                setNotificationType('error')
                setTimeout(()=> {
                  setNotification(null)
                  setNotificationType(null)
                }, 5000)
              }
              )
              
          }
          
          
        } else if (persons.filter((person) => person.number === newNumber).length !== 0){
          alert(`${newName} cannot have the same number as someone else`)
        }
        else {
        //   setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
        //   setShowResults(persons)
        //   setNewName('')
        //   setNewNumber('')

          const personObj = {
            name: newName, 
            number: newNumber
            // , id: persons.length + 1
          }
          personService
            .create(personObj)
            .then( newPerson=> {
              
              setPersons(persons.concat(newPerson))
              setShowResults(persons.concat(newPerson))
              setNewName('')
              setNewNumber('')
              
            })
            .then( () => {
              setNotification(`Added '${personObj.name}' successfully`)
              setNotificationType('success')
              setTimeout(()=> {
                setNotification(null)
                setNotificationType(null)
              }, 5000)
            }
            )
          
        }
          
      }



  return (
    <div>
        {/* <div>Debug: {showResults[0].name}</div> */}
        <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div >
          name: <input onChange={handleNameInput} value={newName}/>
        </div>
        <div >
          number: <input onChange={handleNumberInput} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      

    </div>
  )
}

export default PersonForm