import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
	mutation CreateQuiz($title: String!, $moduleId: ID!, $open: String!, $close: String!, $questions: [QuizQuestionInput!]!, $displayScore: Boolean!) {
		createQuiz(title: $title, moduleId: $moduleId, open: $open, close: $close, questions: $questions, displayScore: $displayScore) {
			response
			error
		}
	}
`

export const READ_QUIZ = gql`
	query ReadQuiz($_id: ID!) {
		readQuiz(_id: $_id) {
			_id
			title
			open
			close
			questions {
				_id
				type
				order
				body
				explanation
				options {
					_id
					value
				}
				answers
			}
			displayScore
		}
	}
`

export const READ_QUIZ_WITHOUT_ANSWERS = gql`
	query ReadQuizWithoutAnswers($_id: ID!) {
		readQuiz(_id: $_id) {
			_id
			title
			open
			close
			questions {
				type
				order
				body
				options {
					_id
					value
				}
			}
			displayScore
		}
	}
`

export const READ_QUIZ_WITHOUT_QUESTIONS = gql`
	query ReadQuizWithoutQuestions($_id: ID!) {
		readQuiz(_id: $_id) {
			_id
			title
			open
			close
			displayScore
		}
	}
`

export const READ_MODULE_QUIZZES = gql`
	query ReadModuleQuizs($moduleId: ID!) {
		readModule(id: $moduleId) {
			quizzes {
				_id
				title
				open
				close
			}
		}
	}
`

export const UPDATE_QUIZ = gql`
	mutation UpdateQuiz($_id: ID!, $title: String!, $open: String!, $close: String!, $questions: [QuizQuestionInput!]!, $displayScore: Boolean!) {
		updateQuiz(_id: $_id, title: $title, open: $open, close: $close, questions: $questions, displayScore: $displayScore) {
			response
			error
		}
	}
`

export const DELETE_QUIZ = gql`
	mutation DeleteQuiz($_id: ID!) {
		deleteQuiz(_id: $_id) {
			response
			error
		}
	}
`