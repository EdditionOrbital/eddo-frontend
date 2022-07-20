import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, Checkbox, Group, Space, Stack, Text, TextInput, Title } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { READ_QUIZ_WITHOUT_ANSWERS, READ_QUIZ_WITHOUT_QUESTIONS } from "../../queries/quiz";
import { READ_CURRENT_USER_QUIZ_SUBMISSIONS } from "../../queries/quizSubmission";
import { UserContext } from "../../services/userContextProvider";
import { Quiz, QuizQuestion, QuizResponse } from "../../types/quiz.type";

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
		}
	})
	const [getQuizQuestions] = useLazyQuery(READ_QUIZ_WITHOUT_ANSWERS, {
		variables: { _id: quizId },
		onCompleted: ({ readQuiz }) => {
			if (quiz) setQuiz({...quiz, ...readQuiz})
		}
	})
	const [getQuizSubmissions] = useLazyQuery(READ_CURRENT_USER_QUIZ_SUBMISSIONS, {
		onCompleted: ({ currentUser }) => {
			if (user && currentUser) {
				setUser({...user, ...currentUser})
			}
		}
	})
	useEffect(() => {
		return () => setCurrentQuestion(-1)
	}, [])
	useEffect(() => {
		if (quiz?.questions && !responses?.map(r => r.questionId).includes(quiz.questions[currentQuestion]._id)) {
			setResponses([...(responses || []), ({ questionId: quiz.questions[currentQuestion]._id, options: []})])
		}
	}, [currentQuestion])
	useEffect(() => {
		if (user && !user.quizSubmissions) {
			getQuizSubmissions()
		} else if (user?.quizSubmissions && !responses) {
			const currQuizSub = user.quizSubmissions.find(q => q._id === quizId)
			if (currQuizSub) setResponses(currQuizSub.responses)
		}
	}, [user])
	useEffect(() => {
		if (!quiz) {
			if (currentQuestion >= 0) getQuizQuestions()
			else getQuizMeta()
		} else {
			if (currentQuestion >= 0 && !quiz.questions) getQuizQuestions()
		}
		if (quiz?.questions && !responses?.map(r => r.questionId).includes(quiz.questions[currentQuestion]._id)) {
			setResponses([...(responses || []), ({ questionId: quiz.questions[currentQuestion]._id, options: []})])
		}
	}, [quiz, currentQuestion])
	if (quiz === undefined) return <></>
	if (quiz === null) return <Text>No quiz found with this ID.</Text>
	const question = quiz.questions && quiz.questions[currentQuestion]
	console.log(responses)
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
						<Button>Save</Button>
						{ currentQuestion + 1 === quiz.questions.length ? <Button>Finish</Button> : <Button onClick={() => setCurrentQuestion(q => q + 1)}>Next</Button>}
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
					<Button onClick={() => setCurrentQuestion(0)}>
						Start
					</Button>
				</Group>
				<Stack spacing={6}>
					<Title order={5}>Number of Questions</Title>
					<Text>{quiz.numQuestions}</Text>
				</Stack>
				<Stack spacing={6}>
					<Title order={5}>Your Previous Attempts</Title>
					<Text>{
						user?.quizSubmissions?.length || 0
					}</Text>
				</Stack>
			</Stack>
		)
}