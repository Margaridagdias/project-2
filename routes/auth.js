const express = require('express');
const router  = express.Router();


router.get('/auth', (req, res, next) => {
  res.render('Auth');
});

module.exports = router;