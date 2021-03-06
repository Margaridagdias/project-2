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

/* GET home page */
router.get('/', (req, res, next) => {
  req.app.locals.loggedUser = req.session.currentUser;
  res.render('index', { user: req.session.currentUser });
});

router.get('/seach-lyrics', requireLogin, (req, res) => {
  res.render('private');
});



module.exports = router;