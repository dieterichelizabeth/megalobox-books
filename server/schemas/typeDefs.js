// Import GraphQL Tagged Template Function
const { gql } = require("apollo-server-express");

// Type Definitions
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: []
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
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
Done - define the User type
Done - define the Book type
Done - define the Auth type
Done - Query type for "me" to return a user
Done - Mutation type for login, adding a new user,
- Mutation type for saving a book, removing a book to return a user
 */
