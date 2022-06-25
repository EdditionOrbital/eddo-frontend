import { useLazyQuery } from "@apollo/client"
import { Button, Group, Stack } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import { WEEKDAYS } from "../../constants/weekdays"
import { CONTEXT_LESSONS } from "../../queries/lessons"
import { UserContext } from "../../services/userContextProvider"
import { Lesson } from "../../types/lesson.type"
import { isCurrentSemMod } from "../../utils/currentYearSemester"
import CalendarItem from "./CalendarItem"

const lessonTypes = ['All', 'Lecture', 'Tutorial', 'Seminar-Style Module Class', 'Laboratory']

interface CalendarListProps {
	date: Date
}

const CalendarList = (props: CalendarListProps) => {
	const { user, setUser } = useContext(UserContext)
	const [type, setType] = useState(lessonTypes[0])
	const [getUserLessons] = useLazyQuery(CONTEXT_LESSONS, {
		onCompleted: ({ contextLessons }) => {
			if (user) setUser(({...user, lessons: contextLessons}))
		}
	})
	
	useEffect(() => {
		if (user && !user.lessons) getUserLessons()
	}, [user, getUserLessons])

	const lessons = user?.lessons
	if (!lessons) return <></>

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