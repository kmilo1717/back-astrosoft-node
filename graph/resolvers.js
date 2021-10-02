const User = require('../models/User');
const Proyect = require('../models/Proyect');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path : 'develop.env'});


const creatToken = (user, SECRET, expiresIn ) => {
  const { id, email, role, fullname } = user;

  return jwt.sign({ id, email, role, fullname  }, SECRET, { expiresIn } )
}


//Resolvers
const resolvers = {
  Query : {
    //#############USERS########################
    getUserToken : async(_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRET)
      return userId;
    },
    getUser : async(_, { id }) => {
      const user = await User.findOne({ id });

      console.log(user)
      return user;
    },
    //#############PROYECTS########################
    getProyects : async() => {
      try {
        const resp = await Proyect.find({}).populate({
          path:'members.id_user',
          select:"fullname email role create_at state progress"
        })

        return resp;
      } catch (error) {
        console.log(error)
      }
    },
    getProyect : async(_, { id }) => {
      try {
        const resp = await Proyect.findOne({id}).populate({
          path:'members.id_user',
          select:"fullname email role create_at"
        })

        return resp;
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation : {
    //#############USERS########################
    newUser : async(_, { input }) => {

      const { email, password } = input;

      
      //find to user exist
      const userExists = await User.findOne({email});
      if(userExists){
        throw new Error('user Exists')
      }

      //hash password
      const salt = bcryptjs.genSaltSync(10);
      input.password = bcryptjs.hashSync(password, salt);

      try {
        //save db
        const userInsert = new User(input);
        userInsert.save();

        return userInsert;
      } catch (error) {
        console.log(error)
      }

      return "Creando..."
    },
    authUser : async(_, { input }) => {
      const { email, password } = input;

      //find to user exist
      const userExists = await User.findOne({email});
      if(!userExists){
        throw new Error('user does not exist')
      }

      //validate password
      const passwordOk = await bcryptjs.compare(password, userExists.password);

      if(!passwordOk){
        throw new Error('incorrect pasword')
      }

      //Create token
      return {
        token : creatToken( userExists, process.env.SECRET, '24h' )
      }
    },
    //#############PROYECTS########################
    newProyect : async(_, { input }) => {
      try {
        const newProyect = new Proyect(input);
        //save db
        const resp = await newProyect.save();
        return resp;
      } catch (error) {
        console.log(error)
      }
    },
    progressProyect : async(_, { input }) => {
      console.log(input)
      const { id, progress } = input;
      let proyExists = await Proyect.findOne({id});
      if(!proyExists){
        throw new Error('Proyect does not exist')
      }
      if(progress <= 0){
        proyExists.progress = 0
        proyExists.state = "Not started";
      }else if(progress > 0 && progress <= 100){
        proyExists.progress = progress;
        proyExists.state = "Start";
      }else if(progress > 100){
        proyExists.progress = 100
        proyExists.state = "Complete";
      }

      console.log(proyExists)

      proyExists.save();
      return proyExists;
    }
  }
}

module.exports = resolvers;