const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
  userName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  hobby: {
    type: String
  },
  metaData: {
    userID: {
      type: Number,
      unique: true
    },
    linkID: {
      type: String
    },
    registeredOn: {
      type: Date,
      default: Date.now
    },
    serials: {
      type: String
    }
  }
})

module.exports = mongoose.model('User', userSchema)