const mongoose = require('mongoose');
const { Schema } = mongoose

const newChild = new Schema({
    name: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

const Child = mongoose.model('Child', newChild);

module.exports = Child