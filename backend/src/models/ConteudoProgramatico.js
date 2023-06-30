
const mongoose = require('mongoose')

const criarConteudoProgramtico = new mongoose.model('ConteudoProgramatico',{
    curso: String, 
    conteudo_programatico: Array, 
}
)

module.exports = criarConteudoProgramtico