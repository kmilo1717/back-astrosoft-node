const { gql } = require("apollo-server");

//Schemas
const userSchema = gql`
  #Types

  type User {
    _id: ID
    id: String
    fullname: String
    email: String
    create_at: String
  }

  type Token {
    token: String
  }

  #Inputs

  input UserInput {
    id: String!
    fullname: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  #Querys and Muttios

  type Query {
    getAllUsers: [User]
    getUserbyId(id: String!): User
    getUserToken(token: String!): User
  }
  type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
  }
`;

module.exports = userSchema;
