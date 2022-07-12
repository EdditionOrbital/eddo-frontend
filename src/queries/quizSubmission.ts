import { gql } from "@apollo/client";

export const CREATE_QUIZ_SUBMISSION = gql`
	mutation CreateQuizSubmission($quizId: ID!, $responses: [QuizResponseInput!]!, $time: Int!, $status: String!) {
		createQuizSubmission(quizId: $quizId, responses: $responses, time: $time, status: $status) {
			response
			error
		}
	}
`

export const READ_QUIZ_SUBMISSION = gql`
	query ReadQuizSubmission($_id: ID!) {
		readQuizSubmission(_id: $_id) {
			_id
			date
			studentId
			quizId
			responses
			time
			status
		}
	}
`

export const READ_CURRENT_USER_QUIZ_SUBMISSIONS = gql`
	query ReadCurrentUserQuizSubmissions {
		currentUser {
			... on Student {
				quizSubmissions {
					_id
					date
					quizId
					responses
					time
					status
				}
			}
		}
	}
`

export const UPDATE_QUIZ_SUBMISSION = gql`
	mutation UpdateQuizSubmission($_id: ID!, $responses: [QuizResponseInput!]!, $time: Int!, $status: String!) {
		updateQuizSubmission(_id: $_id, responses: $responses, time: $time, status: $status) {
			response
			error
		}
	}
`

export const DELETE_QUIZ_SUBMISSION = gql`
	mutation DeleteQuizSubmission($_id: ID!) {
		deleteQuizSubmission(_id: $_id) {
			response
			error
		}
	}
`