const { gql } = require('apollo-server');


//Schemas
const typeDefs = gql`

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

  type Proyect {
    id       : ID
    name     : String
    state    : String
    create_at: String
  }

  input ProyectInput {
    name : String!
    state : String!
    create_at : String
  }




  #Querys and Muttios

  type Query {
    # Users
    getUser(token:String!) : User


    # Proyects
    getProyects:[Proyect]
  }
  type Mutation {

    # Users
    newUser(input:UserInput) : User
    authUser(input:AuthInput) : Token

    # Proyects
    newProyect(input:ProyectInput):Proyect

  }




`;


module.exports = typeDefs;