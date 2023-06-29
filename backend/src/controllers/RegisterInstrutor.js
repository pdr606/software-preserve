

const RegisterInstrutor = require('../models/RegisterInstrutor')


module.exports = {
    async read(req, res){
        const instrutorList = await RegisterInstrutor.find()

        return res.status(200).json(instrutorList)
    },


    async create(req, res){
        const {nome, formacao, dados, url_foto} = req.body

        if(!nome || !formacao || !dados){
            return res.status(400).send({msg: 'Complete os dados'})
        }

        const criarInstrutor = await RegisterInstrutor.create({
            nome,
            formacao,
            dados,
            url_foto
        })

        return res.send(criarInstrutor)


    }
}