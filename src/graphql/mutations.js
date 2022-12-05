import { gql } from "@apollo/client";



export const SIGNUP_USER = gql`
 mutation signupUser($newUser : createUserInput!){
    signup(newUser : $newUser){
        id
        email
        firstName
        lastName
    }
 }
`

export const SIGNIN_USER = gql`
 mutation signinUser($user : userSigninInput!){
    signin(user : $user){
        token
    }
 }
`
export const SEND_MESSAGE = gql`
 mutation sendMessage($recieverId:Int! , $text: String! ){
    sendmessage(recieverId: $recieverId, text: $text ){
        id
        text
        senderId
        recieverId
        sentAt
    }
 }
`