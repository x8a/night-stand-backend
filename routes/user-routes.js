const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = require('../models/user-model')

router.get('/edit/profile', (req, res, next) => {
    User
    .findById(req.user._id)
    .populate()
    .then()
    .catch(e => {
        next(e)
        res.json(e)
    })
})

router.put('/edit/profile', (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, req.body)
      .then(() => {
        res.json({ message: `User with ID: ${req.user._id} is updated successfully.` });
      })
      .catch(error => {
        res.json(error);
      });
});

module.exports = router