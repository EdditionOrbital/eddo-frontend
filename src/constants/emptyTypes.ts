import { Media } from "../types/media.type";

export const emptyMedia: Media = {
	title: '',
	url: '',
	date: new Date().toISOString(),
	tags: []
}