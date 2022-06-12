import { gql } from "@apollo/client"

export const CURRENT_USER_ANNOUNCEMENTS = gql `
    query CurrentUserAnnouncements {
        currentUserAnnouncements {
            title
            authorId
            moduleId
            date
        }
    }
`