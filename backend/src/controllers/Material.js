const mongoose = require('mongoose')
const Material = require('../models/Material')



module.exports = {
  
    async create(req, res){
        const {treinamento, kit, data} = req.body

        if (!treinamento || !kit || !data){
            res.status(400).json({msg: 'Complete todos os dados'})
        }

        const MaterialCreate = await Material.create({
            treinamento,
            kit,
            data
        })


        return res.json(MaterialCreate)
    }



}