import { gql } from "@apollo/client";

export const READ_MODULE_RESOURCES = gql`
	query ReadModuleResources($id: ID!) {
		readModule(id: $id) {
			files {
				_id
				title
				path
				size
				parentFolder
			}
			folders {
				_id
				title
				parentFolder
			}
		}
	}
`