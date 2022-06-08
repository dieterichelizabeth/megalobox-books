// Import GraphQL Tagged Template Function
const { gql } = require("apollo-server-express");

// Type Definitions
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
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
    testRun: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      authors: [String]!
      description: String!
      title: String!
      image: String!
      link: String!
    ): User
    removeBook(bookId: String!): User
  }
`;

// Export TypeDefs
module.exports = typeDefs;
