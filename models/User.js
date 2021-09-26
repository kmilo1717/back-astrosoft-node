const mongoose = require('mongoose');

const UsersSchema =  mongoose.Schema({
  fullname : {
    type : String,
    require : true,
    trin : true 
  },
  role : {
    type : String,
    require : true,
    trin : true
  },
  email : {
    type : String,
    require : true,
    trin : true,
    unique : true
  },
  password : {
    type : String,
    require : true,
    trin : true,
  },
  create_at : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('User', UsersSchema);