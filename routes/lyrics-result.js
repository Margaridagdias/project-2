const express = require('express');
const router  = express.Router();

router.get('/lyrics', (req, res, next) => {
  res.render('lyrics-result');
});

module.exports = router;