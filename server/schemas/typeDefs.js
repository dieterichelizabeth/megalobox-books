// Import GraphQL Tagged Template Function
const { gql } = require("apollo-server-express");

// Type Definitions
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }

  type Query {
    testRun: String
    user: User
  }
`;

// Export
module.exports = typeDefs;

/*
Notes:
documentation-
- schema's structure to support the client actions
- between the backticks are SDL: schema definition language
- definitions in a GraphQL schema are object types. 
- Query type allows the client to fetch objects defined in the typeDefs
- Mutation type allows clients to modify data

todo-
- define the User type
- define the Book type
- define the Auth type
- Query type for "me" to return a user
- Mutation type for login, adding a new user, and saving a book
- Removing a book to return a user
 */
