const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbConfig = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uq0mc8b.mongodb.net/annotations?retryWrites=true&w=majority`

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedToPology: true,

})

module.exports = connection