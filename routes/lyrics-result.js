const express = require('express');
const router  = express.Router();
const geniusAPI = require('genius-api');
const genius = new geniusAPI('K5zGBdFLMx1ycnEEde2N8LnaQz3s_swt7goDvm7etnBV9x4F-h3sQ8zRyE6VGjyz');
router.get('/lyrics', (req, res, next) => {
  res.render('lyrics-result');
});

router.get('/lyrics-result/:songId', (req, res) => {
  let songId = req.params.songId;
  genius.song(songId)
    .then((songFound) => {
      console.log ('testeeeeeeeee', songFound.song);

     // {{!-- FALTAAAAAAAAAAAA ulnessar --}} --------------------------------------------------
     
      //guardar na base de dados que eu carreguei nesta song
      History.create({artistName: '', song: ''}).then(() => {
        res.render('lyrics-result', { songs: songFound.song});
      })  
    })
    .catch((err) => {
      res.render('error', { err });
    })
});


module.exports = router;
