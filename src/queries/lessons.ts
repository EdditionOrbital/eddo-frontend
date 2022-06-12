import { gql } from "@apollo/client";

export const CURRENT_USER_LESSONS =gql `
query CurrentUserLessons{
    currentUserLessons {
        code
        moduleId
        day
        startTime
        endTime
        lessonType
    }

}
`