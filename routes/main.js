const express = require('express');
const app = require('../app');
const router  = express.Router();
<<<<<<< HEAD
const User = require('../models/User.model')
=======
const History = require('../models/History');
>>>>>>> 724898372e2606f1b118540257e5e692d7bb7771

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next(); // allow the next route to run
  } else {
    res.redirect('/login');
  }
}

router.get('/main', (req, res, next) => {
  req.app.locals.loggedUser = req.session.currentUser;
  History.find()
  .then((historyResults)=> {
    res.render('songs-search-results', { user: req.session.currentUser, historyResults: historyResults });
  });
});





module.exports = router;