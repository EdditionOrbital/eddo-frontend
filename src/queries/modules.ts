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
export const READ_MODULE_DASHBOARD = gql`
    query ReadModuleDashboard($id: ID!) {
        readModule(id: $id) {
            id
            title
            description
            code
            year
            semester
        }
    }
`