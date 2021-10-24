const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Modulo de proyectos
const ProyectSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trin: true,
  },
  start_date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  end_date: {
    type: Date,
    require: true,
    default: Date.now() + 70,
  },
  members: [
    {
      user_id: { type: Schema.ObjectId, ref: "User" },
      user_role: { type: String },
    },
  ],
  progress: {
    type: Number,
    default: 0,
  },
  state: {
    type: String,
    require: true,
    trin: true,
    default: "Sin Iniciar",
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyect", ProyectSchema);
