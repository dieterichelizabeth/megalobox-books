// Import models
const { User } = require("../models");

// Queries and Mutations for Mongoose models
const resolvers = {
  Query: {
    me: async (parent, args) => {
      return User.findOne(args);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
  },
};

// Export
module.exports = resolvers;

/*
Notes:
documentation-
- "A resolver is a function that's responsible for populating the data for a single field in your schema".
- resolvers return either the data of the type required by the schema OR a promise that fulfills with data of the required type
- fieldName: (parent, args, context, info) => data; (Resolvers can accept 4 arguments)

todo-
- Define the Query resolvers for fields "me", "user", "book" (get)
- Define the Mutation resolver for fields "login", "addUser", "add book", "remove book" (post, put, delete)
 */
