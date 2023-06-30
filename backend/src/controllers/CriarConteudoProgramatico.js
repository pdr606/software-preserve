

const ConteudoProgramatico = require('../models/ConteudoProgramatico')


module.exports = {

    async read (req, res){

        const buscarConteudoProgramatico = await ConteudoProgramatico.find()

        return res.send(buscarConteudoProgramatico)
    },


    async create (req, res){

        const {curso, conteudo_programatico} = req.body

        const criarConteudoProgramaticoNoBanco = await ConteudoProgramatico.create({
            curso,
            conteudo_programatico

        })

        return res.send(criarConteudoProgramaticoNoBanco)
    }
}