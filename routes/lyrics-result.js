const express = require('express');
const router  = express.Router();
const geniusAPI = require('genius-api');
const genius = new geniusAPI('K5zGBdFLMx1ycnEEde2N8LnaQz3s_swt7goDvm7etnBV9x4F-h3sQ8zRyE6VGjyz');
const History = require('../models/History');

router.get('/lyrics', (req, res, next) => {
  res.render('lyrics-result');
});


router.get('/lyrics-result/:songId', (req, res) => {
  let songId = req.params.songId;
  genius.song(songId)
    .then((songFound) => {
      console.log ('artist', songFound);

    // falta acrescentar à frente de artist name e song ------------------------------------------
       History.create({ song: songFound.song.full_title, image: songFound.song.header_image_thumbnail_url}).then(() => {
      res.render('lyrics-result', { songs: songFound.song.image});
    })
    .catch((err) => {
      res.render('error', { err });
    })
});
});


module.exports = router;
