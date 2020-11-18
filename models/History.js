const mongoose = require('mongoose');
const { Schema, model }  = mongoose;
const historySchema = new Schema(
  {
    song: {
      type: String
    },
    image: {
      type: String
    }
  }
)
module.exports= model('History', historySchema);