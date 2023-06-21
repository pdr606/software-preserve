const Annotation = require('../models/Annotation')


module.exports = {

    async read(req, res){
        const annotationList = await Annotation.find()

        return res.json(annotationList)
    },

    async create(req, res){
        const {title, notes} = req.body

        if(!title || !notes) {
            return res.status(400).json({msg: "Necessário um título e uma nota"})
        }

        const annotationCreate = await Annotation.create({
            title,
            notes
        })

        return res.json(annotationCreate)
    }
}