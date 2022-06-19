export interface File {
	_id: string
	title: string
	path: string
	size: number
	parentFolder: string
	moduleId: string | undefined
	openDate: string | undefined
	closeDate: string | undefined
}

export interface Folder {
	_id: string
	title: string
	parentFolder: string
	moduleId: string | undefined
	openDate: string | undefined
	closeDate: string | undefined
}