// Import models
const { User } = require("../models");
// Relay Mongoose (User) errors to the client
const { AuthenticationError } = require("apollo-server-express");
// Import signToken from auth.js
const { signToken } = require("../utils/auth");

// Queries and Mutations for Mongoose models
const resolvers = {
  Query: {
    // Get one user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    // Add a new user - uses JWT Authentication
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Login - uses JWT Authentication
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid Email.");
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError("Invalid Password.");
      }

      const token = signToken(user);
      return { token, user };
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
Done - Define the Query resolvers for fields "me" (get)
- Define the Mutation resolver for fields "login", "addUser", "add book", "remove book" (post, put, delete)
 */
