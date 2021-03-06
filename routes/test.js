const express = require('express');
const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Enter a username and password.' });
      return;
    }

    if (!name || !lastName) {
        res.status(400).json({ message: 'Enter a name and last name' });
        return;
    }

 
    if(password.length < 7){
        res.status(400).json({ message: 'Your password must contain 7 characters.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {
 
        if(err){
            res.status(500).json({message: "We could not retrieve your username. Try again."});
            return;
        }
 
        if (foundUser) {
            res.status(400).json({ message: 'This username is taken. Enter another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username: username,
            password: hashPass,
            name: name,
            lastName: lastName,
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'The user could not be created. Try again.' });
                return;
            }
        });
    });
});
 
module.exports = authRoutes;