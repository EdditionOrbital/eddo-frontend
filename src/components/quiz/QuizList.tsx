import { useLazyQuery, useQuery } from "@apollo/client";
import { Badge, Button, Group, Table, TextInput } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { READ_MODULE_QUIZZES } from "../../queries/quiz";
import { READ_CURRENT_USER_QUIZ_SUBMISSIONS } from "../../queries/quizSubmission";
import { UserContext } from "../../services/userContextProvider";
import { Quiz } from "../../types/quiz.type";

export default function QuizList() {
	const { user, setUser } = useContext(UserContext)
	const { moduleId } = useParams()
	const navigate = useNavigate()
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const { data } = useQuery(READ_MODULE_QUIZZES, { variables: { moduleId }})
	const [getQuizSubmissions] = useLazyQuery(READ_CURRENT_USER_QUIZ_SUBMISSIONS, {
		onCompleted: ({ currentUser }) => {
			if (user && currentUser) {
				setUser({...user, ...currentUser})
			}
		},
		fetchPolicy: 'no-cache'
	})
	useEffect(() => {
		if (data && data.readModule) setQuizzes(data.readModule.quizzes)
	}, [data])
	useEffect(() => {
		if (user?.__typename === 'Student' && !user?.quizSubmissions) getQuizSubmissions()
	}, [user])
	const makeSubmissionBadge = (quizId: string | undefined) => {
		if (!user || !quizId) return <></>
		const sub = user.quizSubmissions?.find(x => x.quizId === quizId)
		if (!sub) return <Badge>Not Started</Badge>
		return <Badge>{sub.status}</Badge>
	}
	return (
		<>
		<Group>
			<TextInput placeholder="Search"/>
			{
				user?.__typename === 'Staff' &&
				<Button variant="light" onClick={() => navigate('create')}>Add New</Button>
			}
		</Group>
		<Table verticalSpacing='sm'>
			<thead>
				<tr>
					<th>Open</th>
					<th>Close</th>
					<th>Title</th>
					{ user?.__typename === 'Student' && <th>Status</th>}
				</tr>
			</thead>
			<tbody>
				{
					quizzes.map(q => ({ ...q, avail: moment().isBetween(moment(q.open), moment(q.close))})).map(q => (
						<tr onClick={() => navigate(q._id || '')} className='fade-hover-card' style={{ opacity: q.avail ? 1 : 0.2}}>
							<td width={150}>{moment(q.open).format('DD/MM/YY, HH:mm')}</td>
							<td width={150}>{moment(q.close).format('DD/MM/YY, HH:mm')}</td>
							<td>{q.title}</td>
							{ user?.__typename === 'Student' && <td>{makeSubmissionBadge(q._id)}</td>}
						</tr>
					))
				}
			</tbody>
		</Table>
		</>
	)
}