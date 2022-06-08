// Import Express, Apollo Server, Schema, DB connection and Path Module
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

// Set the port
const PORT = process.env.PORT || 3001;

// Define Apollo Server; pass imported Schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// if we're in production, serve client/build as static assets
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

// Call the async Function to start Apollo Server
megaloboxApolloServer(typeDefs, resolvers);
