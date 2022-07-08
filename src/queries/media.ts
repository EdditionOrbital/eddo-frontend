import { gql } from "@apollo/client";

export const CREATE_MEDIA = gql`
	mutation CreateMedia($moduleId: ID!, $title: String!, $url: String!, $tags: [String!]!) {
		createMedia(moduleId: $moduleId, title: $title, url: $url, tags: $tags) {
			response
			error
		}
	}
`

export const READ_MEDIA = gql`
	query ReadMedia($_id: ID!) {
		readMedia(_id: $_id) {
			_id
			title
			date
			url
			tags
		}
	}
`

export const READ_MODULE_MEDIA = gql`
	query ReadModuleMedia($moduleId: ID!) {
		readModule(id: $moduleId) {
			media {
				_id
				date
				url
				title
				tags
			}
		}
	}
`

export const UPDATE_MEDIA = gql`
	mutation UpdateMedia($_id: ID!, $title: String, $url: String, $tags: [String!]) {
		updateMedia(_id: $_id, title: $title, url: $url, tags: $tags) {
			response
			error
		}
	}
`

export const DELETE_MEDIA = gql`
	mutation DeleteMedia($_id: ID!) {
		deleteMedia(_id: $_id) {
			response
			error
		}
	}
`