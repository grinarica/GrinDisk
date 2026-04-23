const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 255,
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel