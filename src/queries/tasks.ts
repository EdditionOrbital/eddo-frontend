import { gql } from "@apollo/client";

export const CONTEXT_TASKS = gql`
    query ContextTasks {
        contextTasks {
            _id
            title
            status
            date
        }
    }
`

export const CREATE_TASK = gql`
    mutation CreateTask($title: String, $status: String) {
        createTask(title: $title, status: $status) {
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