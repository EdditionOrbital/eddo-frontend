import { gql } from "@apollo/client"

export const READ_CURRENT_USER_ANNOUNCEMENTS = gql`
    query ReadCurrentUserAnnouncements {
        currentUser {
            ... on Student {
                announcements {
                    _id
                    title
                    moduleId
                    date
                    content
                    author
                }
            }
            ... on Staff {
                announcements {
                    _id
                    title
                    moduleId
                    date
                    content
                    author
                    authorId
                }
            }
        }
    }
`

export const CREATE_ANNOUNCEMENT = gql`
    mutation CreateAnnouncement($title: String!, $moduleId: String!, $content: String!, $date: String!) {
        createAnnouncement(title: $title, moduleId: $moduleId, content: $content, date: $date) {
            response
            error
        }
    }
`

export const UPDATE_ANNOUNCEMENT = gql`
    mutation UpdateAnnouncement($_id: ID!, $title: String!, $content: String!, $date: String!) {
        updateAnnouncement(_id: $_id, title: $title, content: $content, date: $date) {
            response
            error
        }
    }
`

export const DELETE_ANNOUNCEMENT = gql`
    mutation DeleteAnnouncement($_id: ID!) {
        deleteAnnouncement(_id: $_id) {
            response
            error
        }
    }
`