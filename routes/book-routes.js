const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Book = require('../models/Book-model')
const User = require('../models/user-model')

router.get('/book/:id', (req, res, next) => {
    Book
    .findById(req.params.id)
    .populate('books')
    .then(book => res.json(book))
    .catch(e => {
        next(e)
        res.json(e)
    })
})

router.get('/books', (req, res, next) => {
  Book
  .find({ "reader": req.user._id})
  .populate('books')
  .then(books => {
      res.json(books)
  })
  .catch(e => res.json(e))
})

router.post('/create', (req, res, next) => {
    Book
    .create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        pic: req.body.pic,
        status: req.body.status,
        reader: req.user._id
    })
    .then(response => {
        res.json(response)
        User.findOneAndUpdate({ _id: response.reader[0] },{ $push: { books: response } }).then().catch(e => console.log(e))
        console.log(response)
    })
    .catch(e => {
        next(e)
        res.json(e)
    })
})

router.put('/book/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Book.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `Book with ID: ${req.params.id} is updated successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
});

module.exports = router