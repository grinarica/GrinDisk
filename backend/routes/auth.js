const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../Models/user')
const authenticateToken = require('../middleware/AuthenticatedUser.js')

router.post('/register', async (req, res) => {
    try {
        if (req.body.password.length < 8) return res.status(400).json({
            success: false,
            message: "Password must be atleast 8 characters long."
        })
        if (req.body.password.length > 255) return res.status(400).json({
            success: false,
            message: "Password must be less than 100 characters."
        })

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const savedUser = await user.save()

        console.log(savedUser)

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err.name)

        if (err.name == 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Name must be between 4 and 100 characters long."
            })
        }

        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            })
        }
    }
})

router.post('/login', async (req, res) => {
    if (req.cookies.jwt != null) return res.json({
        success: false,
        message: "You are already logged in."
    })

    const user = await userModel.findOne({ email: req.body.email })

    if (!user) {
        res.status(401).send("Invalid Credentials")
        return
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        res.status(401).send("Invalid Credentials")
        return
    }

    const userObject = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    const accessToken = jwt.sign(userObject, process.env.JWT_SECRET)

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.PRODUCTION_MODE == 'true'
    })
    res.json({
        success: true,
        user: userObject
    })
})

router.post('/logout', (req, res) => {
    res.clearCookie('jwt')

    res.end()
})

router.post('/user', async (req, res) => {
    const jwtToken = req.cookies?.jwt
    if (!jwtToken) {
        return res.json({
            success: false,
            message: "No authentication token found."
        })
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)

    console.log(decoded._id)

    const user = await userModel.findById(decoded._id, { password: 0, __v: 0 })

    res.json({success: true, user: user})
})

module.exports = router