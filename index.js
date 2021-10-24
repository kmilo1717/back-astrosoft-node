const { ApolloServer } = require("apollo-server");
const projectSchema = require("./schema/projectSchema");
const userSchema = require("./schema/userSchema");
const projectResolver = require("./resolvers/projectResolver");
const userResolver = require("./resolvers/userResolver");
const connectDb = require("./config/db");

//Connect Db
connectDb();

//Import schemas and resolvers
const typeDefs = [projectSchema, userSchema];
const resolvers = [projectResolver, userResolver];

//Server with ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Run Server
server.listen().then(({ url }) => {
  console.log(`Run server on URL ${url}`);
});
