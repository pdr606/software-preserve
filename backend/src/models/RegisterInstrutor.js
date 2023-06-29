const mongoose = require('mongoose')


const RegisterInstrutor = new mongoose.model('Instrutor', {
    nome: String,
    formacao: String,
    dados: String,
    url_foto: String
})

module.exports = RegisterInstrutor