import { User } from "./user.type";

export interface EddoAppContext {
	currentUser: User | null,
	dbInitialised: boolean
}