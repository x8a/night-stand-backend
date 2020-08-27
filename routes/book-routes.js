const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Book = require('../models/Book-model')
const User = require('../models/user-model')

router.post('/create/pending', (req, res, next) => {
    Book
    .create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        status: req.body.status,
        reader: req.user._id
    })
    .then(response => {
        res.json(response)
        User.findOneAndUpdate({ _id: response.reader[0] },{ $push: { books: response } }).then().catch(e => console.log(e))
    })
    .catch(e => {
        next(e)
        res.json(e)
    })
})

module.exports = router