const express = require('express');
const router  = express.Router();
const geniusAPI = require('genius-api');
const { response } = require('../app');

router.get('/songs-search', (req, res, next) => {
  res.render('songs-search-results');
});

router.post('/songs-search', (req, res, next) => {
  const genius = new geniusAPI('K5zGBdFLMx1ycnEEde2N8LnaQz3s_swt7goDvm7etnBV9x4F-h3sQ8zRyE6VGjyz');
  genius.search('Ghost').then((response) => {
    console.log('hits', response.hits);
  });
  res.render('songs-search-results', { songs: response.hits});
});

module.exports = router;