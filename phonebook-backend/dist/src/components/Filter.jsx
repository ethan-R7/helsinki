import React from 'react'
import { useState } from 'react'

const Filter = ({showResults, setShowResults, persons}) => {

    const [filterQuery, setFilterQuery] = useState('')


  const filterBy = (event) => {
    event.preventDefault()
    setShowResults(persons.filter((person) => {
      if (person.name.toLowerCase().includes(filterQuery.toLowerCase())) {
        return(person.name)
      }
      
    }))
  }

  const handleQueryChange = (event) => {
    setFilterQuery(event.target.value)
  }
  return (
    <div>
        <h2>Phonebook</h2>

    <h2>Filter by: </h2>
    <form onSubmit={filterBy}>
    <input  onChange={handleQueryChange} value={filterQuery}/>
    <input type='submit'/>
    </form>
    </div>
  )
}

export default Filter