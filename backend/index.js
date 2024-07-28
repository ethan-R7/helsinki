const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Phonebook = require('./models/phonebook')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function (req, res) { 
  if(req.method === "POST") {
    return JSON.stringify(req.body) 
  }
  return ""
  }
  )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// WORKS
app.get("/api/persons", (req, res, next) => {
    Phonebook.find({}).then(phonebook => {
      if(phonebook) {
        res.json(phonebook)
      } else {
        res.status(404).end()
      }
      
    })
    .catch(error => next(error))
    
})

// WORKS
app.get("/info", (req, res) => {
    const personQty = Phonebook.length
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

// WORKS
app.get("/api/persons/:id", (req, res, next) => {
    Phonebook.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// WORKS
app.delete("/api/persons/:id", (req,res, next) => {
    Phonebook.findByIdAndDelete(req.params.id)
      .then(result => {
        if(result) {
          res.status(204).end()
        } else {
          res.status(404).end()
        }
        
      })
      .catch(error => next(error))
})

function redirectPostToPut(req, res, next) {
  if(req.method === 'POST') {
    console.log('POST TO PUT')
    req.method = 'PUT'
  }
  next()
}

// WORKS
app.post("/api/persons", (req, res, next) => {
  const body = req.body

  if(body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: "content is missing"})
  } 


  

  const filter = {name: body.name}
  const update = {number: body.number}

  Phonebook.findOneAndUpdate(filter, update, {new: true}, {upsert: true})
    .then(updatedPerson => {
      if(updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
      
    }).catch(error => next(error))


  // Phonebook.findOne({ name : body.name })
  // .then( contact => {
  //   if(contact) {

      

    
  //   } else {
  //     console.log('NORMAL')
  //     const person = new Phonebook({
  //       number: body.number,
  //       name: body.name
  //     })
      
  //     person.save().then(savedPerson => {
  //       if(savedPerson) {
  //         res.json(savedPerson)
  //       } else {
  //         res.status(404).end()
  //       }
        
  //     }).catch(error => next(error))
  //   }
  // })

})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name == 'CastError') {
    return res.status(400).send({error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)