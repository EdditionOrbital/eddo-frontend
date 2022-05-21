import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            error
        }
    }
`

export const REGISTER_MUTATION = gql`
    mutation RegisterMutation($id: ID!, $firstName: String!, $lastName: String, $email: String!, $password: String!, $mYear: Int!) {
        register(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, mYear: $mYear) {
            token
            error
        }
    }
`