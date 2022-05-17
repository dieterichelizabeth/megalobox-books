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
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: ID!
      authors: String!
      description: String!
      title: String!
      image: String!
      link: String!
    ): User
    removeBook(bookId: ID!): User
  }
`;

// Export
module.exports = typeDefs;
