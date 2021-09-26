const mongoose = require('mongoose');
//Modulo de proyectos
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