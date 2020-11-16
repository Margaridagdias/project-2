const express = require('express');
const app = require('../app');
const router  = express.Router();

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next(); // allow the next route to run
  } else {
    res.redirect('/login');
  }
}

router.get('/main', (req, res, next) => {
  req.app.locals.loggedUser = req.session.currentUser;
  res.render('search-lyrics', { user: req.session.currentUser });
});





module.exports = router;