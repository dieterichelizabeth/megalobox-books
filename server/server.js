const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

/*
Transition server to use Apollo with GraphQL schema from REST API
todo:
- Implement the Apollo Server and apply it to the Express server as middleware
- Import the Apollo Server
- Import Authentication middleware (auth.js)
- Import typeDefs and resolvers
- Create a new Apollo server and pass in schemas 
- Create a new instance of Apollo server (using an async function)
  - Integrate Apollo server with Express application as middleware
  - Add console.log of GraphQl API for testing
- Call an async function to start the server
*/
