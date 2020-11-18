const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const { Mongoose } = require('mongoose');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  //hash the password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  if (username === '' || password === '') {
    res.render('auth/signup', 
    { 
      errorMessage: 'Indicate username and password'
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.render('auth/signup', 
    { 
      errorMessage: `Password needs to have at least 6 characteres and must contain at least
      one number and one uppercase letter.
      `
    });
    return;
  }

  User.findOne({'username': username})
    .then((user) => {
      if(user) { // user !== undefined
        res.render('auth/signup', {
          errorMessage: 'The username already exists'
        });
        return;
      }



      User.create({ username, email, password: hashPassword, firstname, lastname })
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          if (error.code === 11000) {
            res.status(500).
            render('auth/signup', {
              errorMessage: 'Username or email already taken'
            })
          }
         // console.log('error', error);
        /*  res.render('auth/signup', {
            errorMessage: error
          })*/
        })
    });
});


router.get('/login', (req, res) => {
  res.render('auth/login')
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/login', {
      errorMessage: 'Please enter both username and password'
    });
    return;
  }

  User.findOne({'username': username})
    .then((user) => {
      if(!user) {
        res.render('auth/login', {
          errorMessage: 'Invalid login'
        })
        //User doesn't exist on the database
        return;
      }

      if (bcrypt.compareSync(password, user.password)) {
        
        //Logged in sucessfully
        req.session.currentUser = user;
        res.redirect('/main');
        //res.render('index', { user })
      } else {
        //Passwords don't match
        res.render('auth/login', {
          errorMessage: 'Invalid login'
        });
      }

    });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;

