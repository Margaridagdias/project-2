const express = require('express');
const router  = express.Router();
const geniusAPI = require('genius-api');

router.get('/lyrics', (req, res, next) => {
  res.render('lyrics-result');
});

module.exports = router;