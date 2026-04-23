const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const rateLimit = require("express-rate-limit")
const fs = require('fs')

const app = express()

if (!fs.existsSync(process.env.UPLOADED_PATH)){
    fs.mkdirSync(process.env.UPLOADED_PATH);
}

const limiter = rateLimit({
    windowsMs: 1 * 60 * 1000, // 1 minute
    max: 100
})

app.use(limiter)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/auth', require('./routes/auth.js'))
app.use('/file', require('./routes/upload.js'))
app.use('/profile', require('./routes/profile.js'))

async function main() {
    try {
        const connection = await mongoose.connect(process.env.DB_URI)
        console.log('Connected to MongoDB')

        app.listen(process.env.EXPRESS_PORT, () => {
            console.log('Express is running on port: ' + process.env.EXPRESS_PORT)
        })
    } catch (error) {
        console.log(error)
    }
}

main()