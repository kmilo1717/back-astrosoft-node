const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graph/schema');
const resolvers = require('./graph/resolvers');
const connectDb = require('./config/db');


//Connect Db
connectDb();


//server with ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers
});



//run Server
server.listen().then(({url})=>{
  console.log(`Run server on URL ${url}`)
});