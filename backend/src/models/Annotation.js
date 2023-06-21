const mongoose = require('mongoose')

const Annotation = new mongoose.model('Annotations', {
    title: String,
    notes: String,
})


module.exports = Annotation