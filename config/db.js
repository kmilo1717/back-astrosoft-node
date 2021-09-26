const mongoose = require('mongoose');

require('dotenv').config({path : 'develop.env'});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log('Database ready')
    
  } catch (error) {
    console.log("Error conecting DB");
    console.log(error);
    process.exit(1);//stop app
  }
}


module.exports = connectDb;