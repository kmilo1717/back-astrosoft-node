const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Modulo de proyectos
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
  members : [
    {
      id_user : {type:Schema.ObjectId, ref:'User'},
      role : {type : String}
    }
  ],
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