const mongoose = require('mongoose')

const Material = new mongoose.model('Material', {
    treinamento: {
        type: String,
        required: true
    },
    kit : {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true

    }

})


module.exports = Material