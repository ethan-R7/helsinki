import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import axios from 'axios'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'



const App = () => {
  // Move allPersons, newName, newNumber, newFilter from components into App
  const [showResults, setShowResults] = useState([])
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  // Correct use of useEffect
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        // Instead of having setPersons & setShowResults, use 1 state => allPersons
        setPersons(initialPersons)
        setShowResults(initialPersons)
      })
    
  }

  useEffect(hook, [])

  return (
    <div>
      
      <Notification notification={notification} type={notificationType} />
      
      <Filter showResults={showResults} setShowResults={setShowResults} persons={persons} />

      <PersonForm persons={persons} setPersons={setPersons} setShowResults={setShowResults} setNotification={setNotification} setNotificationType={setNotificationType}/>

      <Person showResults={showResults} setShowResults={setShowResults} setPersons={setPersons}/>
    </div>
  )
}

export default App