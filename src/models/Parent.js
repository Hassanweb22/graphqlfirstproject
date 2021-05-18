const mongoose = require('mongoose');
const { Schema } = mongoose

const parent = new Schema({
    fatherName: {
        type: String,
        required: true
    },
    occupation:{
        type: String,
        required: true
    }
})

const Parent = mongoose.model('Parent', parent);

module.exports = Parent