import { User } from "../types/user.type";

export const isAdmin = (user: User | null | undefined) => {
	if (user === undefined) return false
	return user?.__typename === 'Admin'
}

export const isStudent = (user: User | null | undefined) => {
	if (user === undefined) return false
	return user?.__typename === 'Student'
}

export const isStaff = (user: User | null | undefined) => {
	if (user === undefined) return false
	return user?.__typename === 'Staff'
}