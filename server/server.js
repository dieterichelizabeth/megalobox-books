// Import Express
const express = require("express");
// Import Apollo Server
const { ApolloServer } = require("apollo-server-express");
// Import the Schema
const { typeDefs, resolvers } = require("./schemas");
// Import the database connection
const db = require("./config/connection");

// Set the port
const PORT = process.env.PORT || 3001;

// Define Apollo Server; pass imported Schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define app
const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Instance of Apollo Server
const megaloboxApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  // applyMiddleware method to connect Apollo Server to Express - very important
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `🌞 Apollo Studio Explorer http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async
megaloboxApolloServer(typeDefs, resolvers);

/*
Transition server to use Apollo with GraphQL schema from REST API

Rest API code:
const routes = require("./routes");
const path = require("path");
app.use(routes);
if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

todo:
Done- Implement the Apollo Server and apply it to the Express server as middleware
Done- Import the Apollo Server
- Import Authentication middleware (auth.js)
Done- Import typeDefs and resolvers
Done- Create a new Apollo server and pass in schemas 
Done- Create a new instance of Apollo server (using an async function)
  - Integrate Apollo server with Express application as middleware
  - Add console.log of GraphQl Studio Explorer for testing
Done- Call an async function to start the server
*/
