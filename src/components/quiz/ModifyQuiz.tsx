import { useLazyQuery, useMutation } from "@apollo/client";
import { Accordion, ActionIcon, Button, Checkbox, Group, Space, Stack, TextInput, Title } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import RichTextEditor from "@mantine/rte";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Trash } from "tabler-icons-react";
import { emptyMCOption, emptyQuiz, emptyQuizQuestion } from "../../constants/emptyTypes";
import { CREATE_QUIZ, READ_QUIZ, UPDATE_QUIZ } from "../../queries/quiz";
import { Quiz, QuizQuestion } from "../../types/quiz.type";


export default function ModifyQuiz() {
	const { moduleId, quizId } = useParams()
	const [quiz, setQuiz] = useState<Quiz | null | undefined>(undefined)
	const [questions, setQuestions] = useState<QuizQuestion[]>(quiz?.questions || [])
	const form = useForm({ initialValues: { title: '', open: new Date(), openTime: new Date(), close: new Date(), closeTime: new Date() } })
	const [readQuiz] = useLazyQuery(READ_QUIZ, {
		variables: { _id: quizId },
		onCompleted: ({ readQuiz }) => {
			var q: Quiz | null = readQuiz
			if (q) {
				q = ({...q, questions: q.questions.map(({__typename, ...x}) => ({...x, options: x.options.map(o => ({ _id: o._id, value: o.value }))}))})
				setQuiz(q)
			}
		},
		fetchPolicy: 'no-cache',
	})
	useEffect(() => {
		if (quizId) readQuiz()
		else setQuiz(emptyQuiz(moduleId || ''))
	}, [quizId])
	useEffect(() => {
		if (quiz) {
			setQuestions(quiz.questions)
			form.setValues({...quiz, open: new Date(quiz.open), openTime: new Date(quiz.open), close: new Date(quiz.close), closeTime: new Date(quiz.close)})
		}
	}, [quiz])
	const [createQuiz] = useMutation(CREATE_QUIZ, {
		variables: {
			title: form.values.title,
			moduleId: moduleId || '',
			open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
			close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString(),
			questions: questions,
			displayScore: false // CHANGE TO USER INPUT
		},
		onCompleted: ({ createQuiz }) => {
			if (createQuiz.response) {
				alert('Created')
				if (quiz) setQuiz({...quiz, _id: createQuiz.response})
			}
		}
	})
	const [updateQuiz] = useMutation(UPDATE_QUIZ, {
		variables: {
			_id: quiz?._id || '',
			title: form.values.title,
			open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
			close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString(),
			questions: questions,
			displayScore: false // CHANGE TO USER INPUT
		},
		onCompleted: ({ updateQuiz }) => {
			if (updateQuiz.response) {
				alert('Updated')
			}
		}
	})
	if (quiz === undefined) return <></>
	return (
		<Stack>
			<Title order={3}>{quiz?._id ? 'Update Quiz' : 'Create New Quiz'}</Title>
			<Stack style={{maxWidth: 400}}>
				<TextInput label='Title' {...form.getInputProps('title')}/>
				<Group>
					<DatePicker label='Open Date' {...form.getInputProps('open')}/>
					<TimeInput label='Open Time' {...form.getInputProps('openTime')}/>
				</Group>
				<Group>
					<DatePicker label='Close Date' {...form.getInputProps('close')}/>
					<TimeInput label='Close Time' {...form.getInputProps('closeTime')}/>
				</Group>
			</Stack>
			<Stack mt='xl' style={{ maxWidth: 700 }}>
				<Group position="apart">
					<Title order={4}>Questions</Title>
					<Group>
						{
							['MCQ', 'MRQ', 'SRQ'].map(t => (
								<Button size="xs" leftIcon={<Plus size={16}/>} onClick={() => setQuestions([...questions, emptyQuizQuestion(t, questions.length + 1)])}>
									{t}
								</Button>
							))
						}
					</Group>
				</Group>
				<Accordion>
					{
						questions.map((q, i) => (
							<Accordion.Item mb='xs' styles={{ item: { border: '1px solid #ddd'} }} label={(
								<Group position="apart">
									<Title order={4}>Question {i + 1} - {q.type}</Title>
									<ActionIcon size='sm' onClick={() => setQuestions(questions.filter(r => r._id !== q._id))} color='red'><Trash/></ActionIcon>
								</Group>
							)}>
								<Stack>
									<Title order={5}>Question Body</Title>
									<RichTextEditor value={q.body} onChange={e => setQuestions(questions.map((s, j) => i === j ? ({ ...s, body: e}) : s))}/>
									<Space/>
									<Group position="apart">
										<Title order={5}>Options</Title>
										<ActionIcon onClick={() => setQuestions(questions.map((s, j) => i === j ? ({ ...s, options: [...s.options, emptyMCOption()]}) : s))}><Plus/></ActionIcon>
									</Group>
									{
										q.options.map((o, k) => (
											<Group>
												{ q.type !== 'MCQ' && <Checkbox checked={q.answers.includes(o._id)} onChange={e => {
													if (e.target.checked) {
														setQuestions(questions.map((s, j) => i === j ? ({ ...s, answers: [...s.answers, o._id]}) : s))
													} else {
														setQuestions(questions.map((s, j) => i === j ? ({ ...s, answers: s.answers.filter(x => x !== o._id)}) : s))
													}
												}}/> }
												{ q.type === 'MCQ' && <Checkbox checked={q.answers.includes(o._id)} onChange={e => {
													if (e.target.checked) {
														setQuestions(questions.map((s, j) => i === j ? ({ ...s, answers: [o._id]}) : s))
													}
												}}/> }
												<TextInput value={o.value} onChange={v => setQuestions(questions.map((s, j) => i === j ? ({ ...s, options: s.options.map((p, l) => k === l ? {...p, value: v.currentTarget.value} : p)}) : s))}/>
											</Group>
										))
									}
									<Space/>
									<Title order={5}>Explanation</Title>
									<TextInput value={q.explanation} onChange={e => setQuestions(questions.map((s, j) => i === j ? ({ ...s, explanation: e.currentTarget.value }) : s))}/>
								</Stack>
							</Accordion.Item>
						))
					}
				</Accordion>
			</Stack>
			<Space/>
			<Group>
				<Button onClick={() => quiz?._id ? updateQuiz() : createQuiz()}>Submit</Button>
			</Group>
		</Stack>
	)
}