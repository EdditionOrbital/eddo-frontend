import { User } from "./user.type"

export interface Announcement {
    _id?: string
    title: string
    authorId?: string
    moduleId: string
    date: string
    content: string
    author?: string
    readBy?: string[]
}