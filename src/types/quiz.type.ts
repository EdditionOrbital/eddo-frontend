export interface Quiz {
	_id?: string
	title: string
	moduleId: string
	open: string
	close: string
	questions: QuizQuestion[]
	displayScore: boolean
	numQuestions?: number
}

export interface QuizQuestion {
	_id: string
	__typename?: string
	type: string
	order: number
	body: string
	explanation: string
	options: MCOption[]
	answers: string[]
}

export interface MCOption {
	_id: string
	__typename?: string
	value: string
}

export interface QuizSubmission {
	_id?: string
	date: string
	studentId?: string
	quizId: string
	responses: QuizResponse[]
	time: number
	status: string
}

export interface QuizResponse {
	__typename?: string
	questionId: string
	options: string[]
}