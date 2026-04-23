const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const userModel = require('../Models/user')
const authenticateToken = require('../middleware/AuthenticatedUser.js')
const fileModel = require('../Models/file.js')

router.post('/changename', authenticateToken, async (req, res) => {
    if (req.body.newname == '') return res.json()
    const user = req.user

    let updated = await userModel.updateOne({
        _id: user._id
    }, {
        name: req.body.newname
    })

    if (req.body.newname.length < 4 || req.body.newname.length > 20) return res.json({
        success: false,
        message: "Name must be between 4 and 100 characters long."
    })

    if (updated.modifiedCount == 1) {
        return res.json({
            success: true,
            message: "Name changed."
        })
    }

    res.send()
})

router.post('/changepassword', authenticateToken, async (req, res) => {
    let user = await userModel.findById(req.user._id)

    if(!req.body.formData.oldPassword) return res.json({ success: false, message: "Old Password is Required." })
    if(!req.body.formData.newPassword) return res.json({ success: false, message: "New Password is Required." })
    if(!req.body.formData.confirmNewPassword) return res.json({ success: false, message: "Confirm New Password is Required." })

    if(!await bcrypt.compare(req.body.formData.oldPassword, user.password)) 
        return res.json({ success: false, message: "Incorrect Old Password." })

    if(req.body.formData.newPassword != req.body.formData.confirmNewPassword) 
        return res.json({ success: false, message: "Passwords do not match." })

    if(req.body.formData.newPassword.length < 8) 
        return res.json({ success: false, message: "New password must be atleast 8 characters long." })

    const newPassword = await bcrypt.hash(req.body.formData.newPassword, 10)

    user.password = newPassword
    await user.save()

    res.send({ success: true })
})

router.delete('/deleteaccount', authenticateToken, async (req, res) => {
    const userFiles = await fileModel.find({ owner: req.user._id })

    userFiles.forEach((file) => {
        fs.unlinkSync(process.env.UPLOADED_PATH + file.filename)
    })

    const deleteFilesInDB = await fileModel.deleteMany({ owner: req.user._id })

    const deleteUser = await userModel.deleteOne({ _id: req.user._id })

    res.send({ success: true })
})

module.exports = router