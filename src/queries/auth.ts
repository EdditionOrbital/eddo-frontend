import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            response
            error
        }
    }
`

export const STUDENT_REGISTER_MUTATION = gql`
    mutation StudentRegisterMutation($id: ID!, $firstName: String!, $lastName: String, $email: String!, $password: String!, $mYear: Int!) {
        createStudent(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, mYear: $mYear) {
            response
            error
        }
    }
`

export const STAFF_REGISTER_MUTATION = gql`
    mutation StaffRegisterMutation($id: ID!, $firstName: String!, $lastName: String, $email: String!, $password: String!, $title: String!) {
        createStaff(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, title: $title) {
            response
            error
        }
    }
`

export const ADMIN_REGISTER_MUTATION = gql`
    mutation NewAdmin($email: String!, $password: String!) {
        newAdmin(email: $email, password: $password) {
            response
            error
        }
    }
`