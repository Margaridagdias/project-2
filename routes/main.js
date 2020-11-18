const express = require('express');
const app = require('../app');
const router  = express.Router();
const User = require('../models/User.model')
const History = require('../models/History');

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

  let filterArray = historyResults.filter((result, pos, arr) => {
      return pos === arr.findIndex(el => (el['song'] === result['song']))
    })

    let limitArray = [...filterArray.slice(0, 10)]

    
    res.render('songs-search-results', { user: req.app.locals.loggedUser, historyResults: limitArray });
  });
});

//FALTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//Update History
router.post('/main', (req, res) => {
  let history = req.session.currentUser
  let { full_title } = req.body;
  History.findByIdAndUpdate(history._id, {
    full_title })
    .then((updatedHistory) => {
    res.redirect('/main');
  });
});

//delete history
router.post('/main/delete', (req, res) => {
  History.findByIdAndRemove(history-_id)
  .then((deletedHistory) => {
    res.redirect('/main');
  });
});




module.exports = router;