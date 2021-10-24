const mongoose = require("mongoose");
const UsersSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
    trin: true,
  },
  fullname: {
    type: String,
    require: true,
    trin: true,
  },
  email: {
    type: String,
    require: true,
    trin: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trin: true,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UsersSchema);
