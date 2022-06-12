import { gql } from "@apollo/client"

export const CONTEXT_ANNOUNCEMENTS = gql `
    query ContextAnnouncements {
        contextAnnouncements {
            title
            moduleId
            date
            author
        }
    }
`