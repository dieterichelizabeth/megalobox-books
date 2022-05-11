// Import models
const { User } = require("../models");
// Relay Mongoose (User) errors to the client
const { AuthenticationError } = require("apollo-server-express");

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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid Email.");
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError("Invalid Password.");
      }

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
