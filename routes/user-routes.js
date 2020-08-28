const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Book = require('../models/Book-model')

router.get('/profile', (req, res, next) => {
    console.log(res.req.user)
    Book
    //.find({ "reader": res.req.user._id})
    .find()
    .populate('books')
    .then(books => {
        res.json(books)
    })
    .catch(e => res.json(e))
})


module.exports = router