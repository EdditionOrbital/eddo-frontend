import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            error
        }
    }
`

export const STUDENT_REGISTER_MUTATION = gql`
    mutation StudentRegisterMutation($id: ID!, $firstName: String!, $lastName: String, $email: String!, $password: String!, $mYear: Int!) {
        registerStudent(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, mYear: $mYear) {
            token
            error
        }
    }
`

export const STAFF_REGISTER_MUTATION = gql`
    mutation StaffRegisterMutation($id: ID!, $firstName: String!, $lastName: String, $email: String!, $password: String!, $title: String!) {
        registerStaff(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, title: $title) {
            token
            error
        }
    }
`