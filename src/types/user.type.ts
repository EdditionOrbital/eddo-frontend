export interface User {
    _id: string,
	id: string,
    firstName: string,
    lastName: string | null,
	email: string,
	password: string,
	mYear: number | undefined,
	title: string | undefined
}