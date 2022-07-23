import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Checkbox, Group, Space, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { READ_QUIZ_WITHOUT_ANSWERS, READ_QUIZ_WITHOUT_QUESTIONS } from "../../queries/quiz";
import { CREATE_QUIZ_SUBMISSION, READ_CURRENT_USER_QUIZ_SUBMISSIONS, UPDATE_QUIZ_SUBMISSION } from "../../queries/quizSubmission";
import { UserContext } from "../../services/userContextProvider";
import { Quiz, QuizQuestion, QuizResponse, QuizSubmission } from "../../types/quiz.type";

export default function QuizAttempt() {
	const [quiz, setQuiz] = useState<Quiz | null | undefined>(undefined)
	const { user, setUser } = useContext(UserContext)
	const { quizId } = useParams()
	const [currentQuestion, setCurrentQuestion] = useState(-1)
	const [responses, setResponses] = useState<QuizResponse[] | undefined>(undefined)
	const [getQuizMeta] = useLazyQuery(READ_QUIZ_WITHOUT_QUESTIONS, {
		variables: { _id: quizId },
		onCompleted: ({ readQuiz }) => {
			setQuiz(readQuiz)
		},
		fetchPolicy: 'no-cache'
	})
	const [getQuizQuestions] = useLazyQuery(READ_QUIZ_WITHOUT_ANSWERS, {
		variables: { _id: quizId },
		onCompleted: ({ readQuiz }) => {
			if (quiz) setQuiz({...quiz, ...readQuiz})
		},
		fetchPolicy: 'no-cache'
	})
	const [getQuizSubmissions] = useLazyQuery(READ_CURRENT_USER_QUIZ_SUBMISSIONS, {
		onCompleted: ({ currentUser }) => {
			if (user && currentUser) {
				setUser({...user, ...currentUser})
			}
		},
		fetchPolicy: 'no-cache'
	})
	const [createQuizSubmission] = useMutation(CREATE_QUIZ_SUBMISSION)
	const [updateQuizSubmission] = useMutation(UPDATE_QUIZ_SUBMISSION)
	const handleSubmit = (status: string) => () => {
		const currSub = user?.quizSubmissions?.find(q => q.quizId === quizId)
		if (currSub) {
			updateQuizSubmission({
				variables: { _id: currSub._id, responses: responses || [], time: 0, status },
				onCompleted: ({ updateQuizSubmission }) => {
					if (updateQuizSubmission.response && user && user?.quizSubmissions) {
						const newSub = ({...currSub, responses: responses || [], status })
						setUser({...user, quizSubmissions: user?.quizSubmissions?.map(q => q.quizId === quizId ? newSub : q)})
					}
				}
			})
		} else {
			createQuizSubmission({
				variables: { quizId: quizId || '', responses: responses || [], time: 0, status },
				onCompleted: ({ createQuizSubmission }) => {
					if (createQuizSubmission.response && user && user?.quizSubmissions) {
						const newSub: QuizSubmission = ({ quizId: quizId || '', date: new Date().toISOString(), time: 0, responses: responses || [], status })
						setUser({...user, quizSubmissions: [...(user.quizSubmissions || []), newSub]})
					}
				}
			})
		}
		if (status === 'Complete') setCurrentQuestion(-1)
	}
	useEffect(() => {
		return () => setCurrentQuestion(-1)
	}, [])
	useEffect(() => {
		if (currentQuestion >= 0 && quiz?.questions && !responses?.map(r => r.questionId).includes(quiz.questions[currentQuestion]._id)) {
			setResponses([...(responses || []), ({ questionId: quiz.questions[currentQuestion]._id, options: []})])
		}
	}, [currentQuestion])
	useEffect(() => {
		if (user && !user.quizSubmissions) {
			getQuizSubmissions()
		} else if (user?.quizSubmissions && !responses) {
			const currQuizSub = user.quizSubmissions.find(q => q.quizId === quizId)
			if (currQuizSub) setResponses(currQuizSub.responses.map(({__typename, ...obj}) => obj))
		}
	}, [user])
	useEffect(() => {
		if (!quiz) {
			if (currentQuestion >= 0) getQuizQuestions()
			else getQuizMeta()
		} else {
			if (currentQuestion >= 0 && !quiz.questions) getQuizQuestions()
		}
		if (quiz?.questions && currentQuestion >= 0 && !responses?.map(r => r.questionId).includes(quiz.questions[currentQuestion]._id)) {
			setResponses([...(responses || []), ({ questionId: quiz.questions[currentQuestion]._id, options: []})])
		}
	}, [quiz, currentQuestion])
	if (quiz === undefined) return <></>
	if (quiz === null) return <Text>No quiz found with this ID.</Text>
	const question = quiz.questions && quiz.questions[currentQuestion]
	const PreviousAttemptCard = () => {
		if (!user?.quizSubmissions) return <></>
		const prevSub = user.quizSubmissions.find(q => q.quizId === quizId)
		if (!prevSub) return <Text>No Previous Attempt Yet</Text>
		return (
			<Card shadow='md' withBorder p='md' style={{ maxWidth: 500 }}>
				<Stack>
					<Text><Text weight='bold'>Date: </Text>{moment(prevSub.date).format("DD/MM/YYYY, hh:mm A")}</Text>
					<Text><Text weight='bold'>Status: </Text>{prevSub.status}</Text>
				</Stack>
			</Card>
		)
	}
	const StartButton = () => {
		if (!user?.quizSubmissions) return <></>
		const prevSub = user.quizSubmissions.find(q => q.quizId === quizId)
		if (!prevSub) return <Button onClick={() => setCurrentQuestion(0)}>Start</Button>
		if (prevSub.status === 'In Progress') return <Button onClick={() => setCurrentQuestion(0)}>Resume</Button>
		return <Tooltip label="You have already completed this quiz!"><Button disabled>Start</Button></Tooltip>
	}
	return currentQuestion >= 0 ?
		quiz.questions ? (
			<Stack>
				<Text weight='bold'>Question {currentQuestion + 1} - {question.type}</Text>
				<div className="dangSetHTML" dangerouslySetInnerHTML={{ __html: question.body || ''}}/>
				<Stack>
					{
						question.type !== 'SRQ' ? question.options.map(o => (
							<Group>
								<Checkbox checked={responses?.find(r => r.questionId === question._id)?.options.includes(o._id) || false} onChange={e => {
									var newResponses: QuizResponse[] = []
									if (e.target.checked) {
										if (question.type === 'MCQ') {
											newResponses = responses?.map(r => r.questionId === question._id ? ({questionId: question._id, options: [o._id]}) : r) || []
										} else {
											newResponses = responses?.map(r => r.questionId === question._id ? ({...r, options: [...r.options, o._id]}) : r) || []
										}
									} else {
										if (question.type === 'MCQ') {
											newResponses = responses?.map(r => r.questionId === question._id ? ({questionId: question._id, options: []}) : r) || []
										} else {
											newResponses = responses?.map(r => r.questionId === question._id ? ({...r, options: r.options.filter(x => x !== o._id)}) : r) || []
										}
									}
									setResponses(newResponses)
								}}/>
								<Text>{o.value}</Text>
							</Group>
						)) : <TextInput value={responses?.find(r => r.questionId === question._id)?.options.find(_ => true) || ''} onChange={x => {
							setResponses(responses?.map(r => r.questionId === question._id ? ({...r, options: [x.currentTarget.value]}) : r))
						}}/>
					}
				</Stack>
				<Space my='md'/>
				<Group position="apart">
					<Button disabled={currentQuestion <= 0} onClick={() => setCurrentQuestion(q => q - 1)}>Back</Button>
					<Group>
						<Button onClick={handleSubmit('In Progress')}>Save</Button>
						{ currentQuestion + 1 === quiz.questions.length ? <Button onClick={handleSubmit('Complete')}>Finish</Button> : <Button onClick={() => setCurrentQuestion(q => q + 1)}>Next</Button>}
					</Group>
				</Group>
			</Stack>
		) : (<></>) : (
			<Stack spacing='xl'>
				<Group position="apart">
					<Stack spacing={4} mb='md'>
						<Title order={3}>{quiz?.title}</Title>
						<Text size='sm'>Closes {moment(quiz.close).format('DD MMMM, hh:mm A')}</Text>
					</Stack>
					<StartButton/>
				</Group>
				<Stack spacing={6}>
					<Title order={5}>Number of Questions</Title>
					<Text>{quiz.numQuestions}</Text>
				</Stack>
				<Stack spacing={6}>
					<Title order={5}>Your Previous Attempt</Title>
					<PreviousAttemptCard/>
				</Stack>
			</Stack>
		)
}