import { gql } from "@apollo/client"

export const CONTEXT_LESSONS = gql `
    query ContextLessons {
        contextLessons {
            code
            moduleId
            startTime
            endTime
            day
            lessonType
        }
    }
`