import { gql } from "@apollo/client";

export const APP_CONTEXT = gql`
    query CurrentUser {
        eddoAppContext {
            currentUser {
                id
                firstName
                lastName
                email
                modules {
                    moduleId
                    lessons
                    role
                }
            }
            dbInitialised
        }
    }
`