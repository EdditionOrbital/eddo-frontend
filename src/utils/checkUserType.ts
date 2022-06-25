import { User } from "../types/user.type";

export const isStudent = (user: User | null | undefined) => {
	return !user ? false : user?.__typename === 'Student'
}

export const isStaff = (user: User | null | undefined) => {
	return !user ? false : user?.__typename === 'Staff'
}