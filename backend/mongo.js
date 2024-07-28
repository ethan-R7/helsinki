const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ethan:${password}@cluster0.mgcgwsr.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    number: String,
    name: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)



if (process.argv.length === 5) {
    const phonebook = new Phonebook({
        number: process.argv[4],
        name: process.argv[3],
    })

    phonebook.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook!`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    Phonebook.find({}).then(result => {
        result.forEach(contact => {
          console.log(contact)
        })
        mongoose.connection.close()
      })
}


