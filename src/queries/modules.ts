import { gql } from "@apollo/client";

export const CONTEXT_MODULES = gql`
    query ContextModules {
        contextModules {
            code
            year
            semester
            title
        }
    }
`