import { gql } from "@apollo/client";

export const APP_CONTEXT = gql`
    query CurrentUser {
        eddoAppContext {
            currentUser {
                id
                firstName
                lastName
                email
                ... on Student {
                    modules {
                        moduleId
                    }
                }
                ... on Staff {
                    modules {
                        moduleId
                    }
                }
            }
            dbInitialised
        }
    }
`