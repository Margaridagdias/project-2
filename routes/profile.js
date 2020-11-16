const express = require('express');
const router  = express.Router();
const User = require ('../models/User.model')


router.get('/profile', (req, res, next) => {
  let user = req.app.locals.loggedUser
  User.findById(user._id)
  console.log(user._id)
  .then(thisUser => {

    res.render('profile', thisUser);
  })

});





module.exports = router;