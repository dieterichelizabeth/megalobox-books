import { gql } from "@apollo/client";

// Create GET_ME query
export const GET_ME = gql`
  query Query {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
