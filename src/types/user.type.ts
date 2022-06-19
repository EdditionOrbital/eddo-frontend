import { ModuleTaken } from "./module.type"
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
	modules: [ModuleTaken]
}