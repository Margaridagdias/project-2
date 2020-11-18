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
  .sort("-date")
  .limit(8)
  .then((historyResults)=> {

  let filterArray = historyResults.filter((result, pos, arr) => {
      return pos === arr.findIndex(el => (el['song'] === result['song']))
    })

    let limitArray = [...filterArray.slice(0, 10)]

    
    res.render('songs-search-results', { user: req.app.locals.loggedUser, historyResults: limitArray });
  });
});



//delete history
router.post('/main/delete/:id', (req, res) => {
  let id = req.params.id
  History.findByIdAndRemove(id)
  .then((deletedHistory) => {
    res.redirect('/main');
  });
});




module.exports = router;