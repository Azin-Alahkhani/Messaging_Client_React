import { gql } from "@apollo/client";



export const GET_USERS = gql`
  query getUsers{
    users{
        id
        firstName
        lastName
        email
      }
  }
`
export const GET_USER_SPECIFIED_MESSAGES = gql`
  query getMessages($recieverId : Int!){
    allMessagesByUser(recieverId : $recieverId){
        id
        text
        senderId
        recieverId
        sentAt
      }
  }
`