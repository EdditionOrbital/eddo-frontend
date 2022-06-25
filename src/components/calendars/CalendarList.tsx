import { useQuery } from "@apollo/client"
import { Button, Group, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import { WEEKDAYS } from "../../constants/weekdays"
import { CONTEXT_LESSONS } from "../../queries/lessons"
import { Lesson } from "../../types/lesson.type"
import { isCurrentSemMod } from "../../utils/currentYearSemester"
import CalendarItem from "./CalendarItem"

const lessonTypes = ['All', 'Lecture', 'Tutorial', 'Seminar-Style Module Class', 'Laboratory']

interface CalendarListProps {
	date: Date
}

const CalendarList = (props: CalendarListProps) => {
	const [lessons, setLessons] = useState<Lesson[]>([])
	const [type, setType] = useState(lessonTypes[0])
	const { loading, data } = useQuery(CONTEXT_LESSONS)
	
	useEffect(() => {
		if (data && data.contextLessons) setLessons(data.contextLessons)
	}, [loading, data])

	return (
		<Stack>
			<Group>
				{lessonTypes.map(t => <Button key={t} variant={t === type ? 'filled' : 'light'} onClick={() => setType(t)} compact>{t}</Button>)}
			</Group>
			<Stack>
				{lessons
					.filter((e: Lesson) => e.day === WEEKDAYS[props.date.getDay()])
					.filter((e: Lesson) => isCurrentSemMod(e.moduleId))
					.filter((e: Lesson) => type === 'All' ? true : type === e.lessonType)
					.map((e: Lesson) => <CalendarItem key={`${e.moduleId} ${e.lessonType} ${e.code} ${e.day}`} event={e}/>)
				}
			</Stack>
		</Stack>
	)
}

export default CalendarList