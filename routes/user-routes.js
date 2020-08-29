const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Book = require('../models/Book-model')

router.get('/profile', (req, res, next) => {
    Book
    .find({ "reader": req.user._id})
    .populate('books')
    .then(books => {
        res.json(books)
    })
    .catch(e => res.json(e))
})


module.exports = router