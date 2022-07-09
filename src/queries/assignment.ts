import { gql } from "@apollo/client";

export const CREATE_ASSIGNMENT = gql`
	mutation CreateAssignment($open: String!, $close: String!, $title: String!, $moduleId: String!, $instructions: String!, $files: [String!]!, $maxScore: Float) {
		createAssignment(open: $open, close: $close, title: $title, moduleId: $moduleId, instructions: $instructions, files: $files, maxScore: $maxScore) {
			response
			error
		}
	}
`

export const READ_ASSIGNMENT = gql`
	query ReadAssignment($_id: ID!) {
		readAssignment(_id: $_id) {
			_id
			open
			close
			title
			instructions
			files
			maxScore
		}
	}
`

export const READ_MODULE_ASSIGNMENTS = gql`
	query ReadModuleAssignments($moduleId: ID!) {
		readModule(id: $moduleId) {
			assignments {
				_id
				open
				close
				title
			}
		}
	}
`

export const UPDATE_ASSIGNMENT = gql`
	mutation UpdateAssignment($_id: ID!, $open: String, $close: String, $title: String, $instructions: String, $files: [String!], $maxScore: Float) {
		updateAssignment(_id: $_id, open: $open, close: $close, title: $title, instructions: $instructions, files: $files, maxScore: $maxScore) {
			response
			error
		}
	}
`

export const DELETE_ASSIGNMENT = gql`
	mutation DeleteAssignment($_id: ID!) {
		deleteAssignment(_id: $_id) {
			response
			error
		}
	}
`