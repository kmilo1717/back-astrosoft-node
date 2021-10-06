const { ApolloServer } = require("apollo-server");
const projectSchema = require("./schemas/projectSchema");
const userSchema = require("./schemas/userSchema");
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
