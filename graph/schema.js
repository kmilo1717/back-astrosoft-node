const { gql } = require('apollo-server');
const ObjectId = require('mongoose').Types.ObjectId;


//Schemas
const typeDefs = gql`

  #Generic
  type ObjectId {
    id : String
    fullname : String
    role     : String
    email    : String
    create_at: String
  }

  # Users
  type User {
    id       : ID
    fullname : String
    role     : String
    email    : String
    create_at: String
  }
  type Token {
    token : String
  }
  input UserInput {
    fullname : String!
    role     : String!
    email    : String!
    password : String!
  }
  input AuthInput {
    email    : String!
    password : String!
  }

  # Proyects

  type ProyectUserRol {
    id_user : ObjectId,
    role : String,
  }

  type Proyect {
    id         : ID
    name       : String
    start_date : String
    end_date   : String
    members    : [ProyectUserRol]
    progress   : Int
    state      : String
    create_at  : String
  }

  input ProyectUserRolInput {
    id_user : ID,
    role : String
  }
  input ProyectInput {
    name       : String!
    start_date : String!
    end_date   : String!
    members    : [ProyectUserRolInput]
    progress   : Int
    state      : String
    create_at  : String
  }

  input ProyectProgress{
    id : ID!
    progress : Int!
  }
  

  #Querys and Muttios

  type Query {
    # Users
    getUserToken(token:String!) : User
    getUser(id:String!) : User

    # Proyects
    getProyects:[Proyect]
    getProyect(id:String!):Proyect
  }
  type Mutation {

    # Users
    newUser(input:UserInput) : User
    authUser(input:AuthInput) : Token

    # Proyects
    newProyect(input:ProyectInput):Proyect
    progressProyect(input:ProyectProgress):Proyect

  }




`;


module.exports = typeDefs;