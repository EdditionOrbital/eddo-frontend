import { AssignmentSubmission } from "./assignment.type"
import { Lesson } from "./lesson.type"
import { ModuleTaken } from "./module.type"
import { QuizSubmission } from "./quiz.type"
import { Task } from "./task.type"
export interface User {
	__typename: string
    _id: string
	id: string
    firstName: string
    lastName: string | null
	email: string
	password: string
	title?: string
	mYear?: number
	modules?: ModuleTaken[]
	lessons?: Lesson[]
	tasks?: Task[]
	assignmentSubmissions?: AssignmentSubmission[]
	quizSubmissions?: QuizSubmission[]
}