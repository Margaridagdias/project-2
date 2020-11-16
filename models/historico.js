const mongoose = require('mongoose');
const { Schema, model }  = mongoose;

const historicoSchema = new Schema(
  {
    artistName: {
      type: String
    }
  }
)

module.exports= model('Historico', userSchema);