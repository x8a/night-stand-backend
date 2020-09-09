const express = require('express')
const router = express.Router()
const axios = require('axios')
const unidecode = require('unidecode')

const Store = require('../models/Store-model')
const User = require('../models/user-model')

router.get('/my-shops/:id', (req, res, next) => {
  Store
  .findById(req.params.id)
  .populate('stores')
  .then(store => res.json(store))
  .catch(e => {
      next(e)
      res.json(e)
  })
})

router.get('/my-shops', (req, res, next) => {
  Store
  .find({ "reader": req.user._id})
  .populate('stores')
  .then(stores => {
      res.json(stores)
  })
  .catch(e => res.json(e))
})

router.get("/map", (req, res, next) => {
    const address = req.query.search
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=formatted_address,name,geometry,place_id&key=${process.env.REACT_APP_GOOGLE_KEY}&input=${address}`)
    .then(response => {
      res.json(response.data)
    })
})

router.post('/new-shop', (req, res, next) => {
  Store
  .create({
      store: req.body.store,
      address: req.body.address,
      reader: req.user._id
  })
  .then(response => {
      res.json(response)
      User.findOneAndUpdate({ _id: response.reader[0] },{ $push: { stores: response } }).then().catch(e => console.log(e))
      console.log(response)
  })
  .catch(e => {
      next(e)
      res.json(e)
  })
})

router.delete('/my-shops/:id', (req, res, next) => {

  Store.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Store with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router