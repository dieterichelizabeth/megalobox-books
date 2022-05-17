import { gql } from "@apollo/client";

// Create the LOGIN_USER, ADD_USER, SAVE_BOOK, AND REMOVE_BOOK mutations
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($id: ID!) {
    saveBook(bookId: $id) {
      _id
      username
      bookCount
      savedBooks {
        _id
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(bookId: $id) {
      _id
      username
      bookCount
      savedBooks {
        _id
      }
    }
  }
`;
