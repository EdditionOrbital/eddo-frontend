export interface Assignment {
	_id?: string
	open: string
	close: string
	title: string
	instructions?: string
	files?: string[]
	maxScore: number | null
}