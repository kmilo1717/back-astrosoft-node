const mongoose = require('mongoose');

const ProyectSchema =  mongoose.Schema({
  name : {
    type : String,
    require : true,
    trin : true 
  },
  start_date : {
    type : Date,
    require : true
  },
  end_date : {
    type : Date,
    require : true
  },
  members : {
    type : Array
  },
  progress : {
    type : Number,
    default : 0
  },
  state : {
    type : String,
    require : true,
    trin : true,
    default : "Start"
  },
  create_at : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('Proyect', ProyectSchema);