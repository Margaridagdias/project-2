const mongoose = require('mongoose');
const { Schema, model }  = mongoose;
const historySchema = new Schema(
  {
    song: {
      type: String
    },
    image: {
      type: String
    },
    date: { type: Date, default: Date.now 
    }
  }
)

module.exports= model('History', historySchema);