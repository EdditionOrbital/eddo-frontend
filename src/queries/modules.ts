import { gql } from "@apollo/client";

export const CURRENT_USER_MODULES = gql`
    query CurrentUserModules {
        currentUserModules {
            code
            year
            semester
            title
        }
    }
`