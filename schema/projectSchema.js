const { gql } = require("apollo-server");

//Schemas
const projectSchema = gql`
  #types

  type Proyect {
    id: ID
    name: String
    start_date: String
    end_date: String
    members: [ProyectUserRol]
    progress: Int
    state: String
    create_at: String
  }

  type ProyectUserRol {
    _id: ID
    user_id: User
    user_role: String
  }

  type User {
    _id: ID
    id: String
    fullname: String
    email: String
    create_at: String
  }

  #inputs

  input ProyectInput {
    name: String!
    start_date: String
    end_date: String
    progress: Int
  }

  input NewMemberInput {
    id: ID
    members: MemberInput
  }

  input MemberInput {
    _id: ID
    user_id: ID
    user_role: String!
  }

  input ProyectProgressInput {
    id: ID!
    progress: Int!
  }

  input updateDatesProjectByIdInput {
    id: ID!
    start_date: String
    end_date: String
  }
  input deleteMemberOnProjectByIdInput {
    project_id: ID!
    member_id: ID!
  }

  #Querys and Muttios

  type Query {
    getAllProyects: [Proyect]
    getProyectById(id: String!): Proyect
  }
  type Mutation {
    newProyect(input: ProyectInput): Proyect
    progressProyect(input: ProyectProgressInput): Proyect
    newMemberOnProject(input: NewMemberInput): Proyect
    updateDatesProjectById(input: updateDatesProjectByIdInput): Proyect
    deleteMemberOnProjectById(input: deleteMemberOnProjectByIdInput): Proyect
  }
`;

module.exports = projectSchema;
