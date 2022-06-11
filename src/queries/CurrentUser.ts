import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query CurrentUser {
        eddoAppContext {
            user {
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