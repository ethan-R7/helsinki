import React from 'react'
import { useState } from 'react'
import personService from '../services/persons.js'


const Person = ({showResults, setShowResults, setPersons}) => {

  const deletePerson = (id) => {
    const person = showResults.find(person => person.id === id)
    if(window.confirm('Delete ' + person.name)){
      personService
      .deleteObj(id)
      .then( () => {
        const newPersons = showResults.filter(person => person.id !== id)

        
        setShowResults(newPersons)
        setPersons(newPersons)
        
      }) 
    }

    
  }
    
  if(!showResults || showResults.length === 0) {
    return <div>No results to display</div>
  }

  return (
    <div>
      <h2>Phonebook</h2>

      
      

      
      <h2>Numbers</h2>
      <ul>{showResults.map((person) => {
        console.log('person:' + person)
        if(!person || person.length === 0) {
          return <p>Not here</p>
        } else{
          
      console.log('person name: ' + person.name)
      return(
        
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
        
      )}
      })}</ul>
      
      
      
    </div>
  )
}

export default Person