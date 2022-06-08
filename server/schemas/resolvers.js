// Import models
const { User } = require("../models");
// Relay Mongoose (User) errors to the client
const { AuthenticationError } = require("apollo-server-express");
// Import signToken from auth.js
const { signToken } = require("../utils/auth");

// Queries and Mutations for Mongoose models
const resolvers = {
  Query: {
    testRun: () => {
      return "tada!!";
    },
    // Get one user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "savedBooks"
        );
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
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
    // Add a new user - uses JWT Authentication
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Save a book to user's saved books
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: { ...args } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    // Remove a book to user's saved books
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

// Export Resolvers
module.exports = resolvers;
