const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const uploader = require('../configs/cloudinary');
const User = require('../models/User-model')

router.get('/edit/profile', (req, res, next) => {
    User
    .findById(req.user._id)
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