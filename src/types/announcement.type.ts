import { User } from "./user.type"

export interface Announcement {
    title: string | null,
    authorId: string | null,
    moduleId: string | null,
    date: string | null
    content: string | null
    author: User | null
}