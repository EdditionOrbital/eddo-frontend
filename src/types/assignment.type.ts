import { User } from "./user.type"

export interface Assignment {
	_id?: string
	open: string
	close: string
	title: string
	instructions?: string
	files?: string[]
	maxScore: number
	submissions?: AssignmentSubmission[]
}

export interface AssignmentSubmission {
	_id: string
	date: string
	studentId?: string
	assignmentId: string
	files: string[]
	score: number
	student?: User
}