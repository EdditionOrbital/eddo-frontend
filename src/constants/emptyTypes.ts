import moment from "moment";
import { Announcement } from "../types/announcement.type";
import { Assignment } from "../types/assignment.type";
import { Media } from "../types/media.type";
import { MCOption, Quiz, QuizQuestion } from "../types/quiz.type";

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

export const emptyQuiz: (moduleId: string) => Quiz = (moduleId: string) => ({
	open: new Date().toISOString(),
	close: moment().add(1, 'M').toISOString(),
	moduleId: moduleId,
	title: '',
	questions: [],
	displayScore: false
})

export const emptyQuizQuestion: (type: string, order: number) => QuizQuestion = (type: string, order: number) => ({
	_id: Math.random().toString(36).slice(2),
	type: type,
	order: order,
	body: '',
	explanation: '',
	options: [],
	answers: []
})

export const emptyMCOption: () => MCOption = () => ({
	_id: Math.random().toString(36).slice(2),
	value: ''
})

export const emptyAnnouncement: (moduleId: string) => Announcement = (moduleId: string) => ({
	title: '',
	moduleId,
	date: new Date().toISOString(),
	content: ''
})