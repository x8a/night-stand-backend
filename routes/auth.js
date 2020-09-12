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
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
 
                if (err) {
                    res.status(500).json({ message: 'The user could not be logged in. Try again.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});

authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'There was when authenticating your user. Try again.' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }
 
        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});
 
authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
    return;
});
 
module.exports = authRoutes;