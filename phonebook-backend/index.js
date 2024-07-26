const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }  
]

app.use(express.json())
app.use(cors())

morgan.token('body', function (req, res) { 
  if(req.method === "POST") {
    return JSON.stringify(req.body) 
  }
  return ""
  }
  )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// app.use(morgan('tiny'))
// app.use(morgan(':type'))



app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    const personQty = persons.length
    let personNoun = ''
    if (personQty > 1) {
        personNoun = 'people'
    } else {
        personNoun = 'person'
    }
    const time = new Date()
    res.send(`
        <p>Phonebook has info for ${personQty} ${personNoun}</p>
        <p>${time}</p>
        `)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id 
    const person = persons.find((person) => person.id === id)
    res.json(person)
})

app.delete("/api/persons/:id", (req,res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
  let maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0
  return String(maxId + 1)
}

app.post("/api/persons", (req, res) => {
  const body = req.body
  let id = generateId()
  const name = 'Hello'
  const number = '177'
  const newPerson = {id: body.id, name: body.name, number: body.number}

  if(newPerson.name == '' || newPerson.number == '') {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  else if(persons.find(p => p.name === newPerson.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
  
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT=3001
app.listen(PORT)