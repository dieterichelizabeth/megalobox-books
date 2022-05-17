import { gql } from "@apollo/client";

// Create GET_ME query
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
