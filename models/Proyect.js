const mongoose = require('mongoose');

const ProyectSchema =  mongoose.Schema({
  name : {
    type : String,
    require : true,
    trin : true 
  },
  state : {
    type : String,
    require : true,
    trin : true
  },
  create_at : {
    type : Date,
    default : Date.now()
  }
});

module.exports = mongoose.model('Proyect', ProyectSchema);