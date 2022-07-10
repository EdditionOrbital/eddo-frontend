import moment from "moment";
import { Assignment } from "../types/assignment.type";
import { Media } from "../types/media.type";

export const emptyMedia: Media = {
	title: '',
	url: '',
	date: new Date().toISOString(),
	tags: []
}

export const emptyAssignment: Assignment = {
	open: new Date().toISOString(),
	close: moment().add(1, 'M').toISOString(),
	title: '',
	instructions: '',
	files: [],
	maxScore: -1
}