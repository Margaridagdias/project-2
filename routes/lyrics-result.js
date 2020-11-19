const express = require('express');
const router  = express.Router();
const geniusAPI = require('genius-api');
const genius = new geniusAPI('K5zGBdFLMx1ycnEEde2N8LnaQz3s_swt7goDvm7etnBV9x4F-h3sQ8zRyE6VGjyz');
const History = require('../models/History');


router.get('/lyrics', (req, res, next) => {
  req.app.locals.loggedUser = req.session.currentUser;
  res.render('lyrics-result', { user: req.session.currentUser});
});



router.get('/lyrics-result/:songId', (req, res) => {
  req.app.locals.loggedUser = req.session.currentUser;
  let songId = req.params.songId;
  genius.song(songId)
    .then((songFound) => {
      console.log ('artist', songFound);

      let dateString = new Date().toLocaleString("en-GB")
    // falta acrescentar à frente de artist name e song ------------------------------------------
       History.create({ song: songFound.song.full_title, image: songFound.song.header_image_thumbnail_url, dateString, idmatch: songFound.id}).then(() => {
      res.render('lyrics-result', { songs: songFound.song, user: req.session.currentUser});
    })
    .catch((err) => {
      res.render('error', { err });
    })
});
});


// router.get('/lyrics-result/:songId', (req, res) => {
//   let songId = req.params.songId;
//   genius.song(songId)
//     .then((songFound) => {
//       console.log ('testeeeeeeeee', songFound.song);

//      // {{!-- FALTAAAAAAAAAAAA ulnessar --}} --------------------------------------------------
     
//       //guardar na base de dados que eu carreguei nesta song
//       History.create({artistName: '', song: ''}).then(() => {
//         res.render('lyrics-result', { songs: songFound.song});
//       })  
//     })
//     .catch((err) => {
//       res.render('error', { err });
//     })
// });


module.exports = router;
