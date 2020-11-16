const mongoose = require('mongoose');
const { Schema, model }  = mongoose;

const historySchema = new Schema(
  {
    artistName: {
      type: String
    },
    song: {
      type: String
    }
  }
)

module.exports= model('Historico', historySchema);