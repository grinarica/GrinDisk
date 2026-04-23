const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fs = require('fs')

const userModel = require('../Models/user')
const authenticateToken = require('../middleware/AuthenticatedUser.js')

const multer = require('multer')
const fileModel = require('../Models/file.js')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOADED_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage })

router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
    const user = req.user

    const allfiles = await fileModel.find({ owner: user._id })

    let memory = 0

    allfiles.forEach(element => {
        memory += element.size
    });

    const freeMemory = 104857600 - memory

    if(freeMemory < req.file.size) {
        return res.json({
            success: false,
            message: "You dont have enaugh space left."
        })
    }

    const newFile = new fileModel({
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        owner: user._id
    })

    const savedFile = await newFile.save()

    res.json({
        success: true,
        file: req.file
    })
})

router.get('/allfiles', authenticateToken, async (req, res) => {
    const user = req.user

    const allfiles = await fileModel.find({ owner: user._id })

    let memory = 0

    allfiles.forEach(element => {
        memory += element.size
    });

    memory = Math.round((memory / 1024 / 1024) * 100) / 100

    res.json({
        memory: memory,
        allfiles: allfiles
    })
})

router.delete('/delete/:file_id', authenticateToken, async (req, res) => {
    const user = req.user

    const currentFile = await fileModel.findById(req.params.file_id)

    if (currentFile == null) return res.json({
        success: false,
        message: 'That file does not exist. Nothing to delete.'
    })

    if (currentFile.owner.toString() != user._id) return res.json({
        success: false,
        message: 'You do not own this file!'
    })

    const deletedState = fs.unlinkSync(process.env.UPLOADED_PATH + currentFile.filename)

    console.log(deletedState)

    const deletedFile = await fileModel.deleteOne({ _id: req.params.file_id })

    res.json(deletedFile)
})

router.get('/download/:file_id', authenticateToken, async (req, res) => {
    const user = req.user

    const currentFile = await fileModel.findById(req.params.file_id)

    if (currentFile == null) return res.json({
        success: false,
        message: 'That file does not exist. Nothing to download.'
    })

    if (currentFile.owner.toString() != user._id) return res.json({
        success: false,
        message: 'You do not own this file!'
    })

    const fileToDownload = process.env.UPLOADED_PATH + currentFile.filename
    const originalFileName = currentFile.originalname

    res.download(fileToDownload, originalFileName)
})

router.get('/usedmemory', authenticateToken, async(req, res) => {
    const user = req.user

    const allfiles = await fileModel.find({ owner: user._id })

    let memory = 0

    allfiles.forEach(element => {
        memory += element.size
    });

    memory = Math.round((memory / 1024 / 1024) * 100) / 100

    res.json({
        usedmemory: memory
    })
})

module.exports = router