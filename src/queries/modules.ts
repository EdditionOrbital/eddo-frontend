import { gql } from "@apollo/client";

export const CONTEXT_MODULES = gql`
    query ContextModules {
        contextModules {
            id
            code
            year
            semester
            title
        }
    }
`