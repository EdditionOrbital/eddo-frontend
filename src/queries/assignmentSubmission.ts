import { gql } from "@apollo/client";

export const CREATE_ASSIGNMENT_SUBMISSION = gql`
	mutation CreateAssignmentSubmission($assignmentId: ID!, $files: [String!]!) {
		createAssignmentSubmission(assignmentId: $assignmentId, files: $files) {
			response
			error
		}
	}
`

export const READ_ASSIGNMENT_SUBMISSION = gql`
	query ReadAssignmentSubmission($_id: ID!) {
		readAssignmentSubmission(_id: $_id) {
			_id
			date
			studentId
			assignmentId
			files
			score
		}
	}
`

export const READ_CURRENT_USER_ASSIGNMENT_SUBMISSIONS = gql`
	query ReadCurrentUserAssignmentSubmissions {
		currentUser {
			... on Student {
				assignmentSubmissions {
					_id
					date
					assignmentId
					files
					score
				}
			}
		}
	}
`

export const UPDATE_ASSIGNMENT_SUBMISSION = gql`
	mutation UpdateAssignmentSubmission($_id: ID!, $score: Float!) {
		updateAssignmentSubmission(_id: $_id, score: $score) {
			response
			error
		}
	}
`

export const DELETE_ASSIGNMENT_SUBMISSION = gql`
	mutation DeleteAssignmentSubmission($_id: ID!) {
		deleteAssignmentSubmission(_id: $_id) {
			response
			error
		}
	}
`