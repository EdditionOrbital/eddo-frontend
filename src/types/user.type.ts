import { Lesson } from "./lesson.type"
import { ModuleTaken } from "./module.type"
import { Task } from "./task.type"
export interface User {
	__typename: string,
    _id: string,
	id: string,
    firstName: string,
    lastName: string | null,
	email: string,
	password: string,
	title: string | undefined,
	mYear: number | undefined,
	modules: ModuleTaken[]
	lessons: Lesson[] | undefined
	tasks: Task[] | undefined
}