import { User } from "./user.type";

export interface Module {
	_id: string
	id: string
	title: string
	description: string | null
	credits: number
	code: string
	year: number
	semester: number
	students: User[]
}

export interface ModuleTaken {
	moduleId: string
	lessons: [string]
	role: string
}