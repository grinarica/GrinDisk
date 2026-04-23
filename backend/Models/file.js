const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
        maxlength: 255
    },
    filename: {
        required: true,
        type: String,
        unique: true,
        maxlength: 255
    },
    size: {
        required: true,
        type: Number,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const fileModel = mongoose.model('File', fileSchema)

module.exports = fileModel