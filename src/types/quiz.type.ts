export interface Quiz {
	_id?: string
	title: string
	moduleId: string
	open: string
	close: string
	questions: QuizQuestion[]
	displayScore: boolean
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