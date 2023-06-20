const mongoose = require('mongoose')

const User = new mongoose.model('User', {
    name: String,
    email: String,
    password: String
})

module.exports = User