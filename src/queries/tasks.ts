import { gql } from "@apollo/client";

export const CURRENT_USER_TASKS = gql`
    query CurrentUserTasks {
        currentUserTasks {
            _id
            title
            status
            date
        }
    }
`

export const NEW_TASK = gql`
    mutation NewTask($title: String, $status: String) {
        newTask(title: $title, status: $status) {
			response
			error
		}
    }
`

export const UPDATE_TASK = gql`
    mutation UpdateTask($_id: ID!, $title: String, $status: String) {
        updateTask(_id: $_id, title: $title, status: $status) {
            response
            error
        }
    }
`

export const DELETE_TASK = gql`
    mutation DeleteTask($_id: ID!) {
        deleteTask(_id: $_id) {
            response
            error
        }
    }
`