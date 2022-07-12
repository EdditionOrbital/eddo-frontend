import { useLazyQuery, useQuery } from "@apollo/client";
import { Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { READ_QUIZ_WITHOUT_ANSWERS, READ_QUIZ_WITHOUT_QUESTIONS } from "../../queries/quiz";
import { Quiz } from "../../types/quiz.type";

export default function QuizAttempt() {
	const [quiz, setQuiz] = useState<Quiz | null | undefined>(undefined)
	const { quizId } = useParams()
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
	useEffect(() => {
		if (!quiz) getQuizMeta()
	}, [quiz])
	if (quiz === undefined) return <></>
	if (quiz === null) return <Text>No quiz found with this ID.</Text>
	return (
		<Stack spacing='xl'>
			<Stack spacing={4} mb='md'>
			<Title order={3}>{quiz?.title}</Title>
				<Text size='sm'>Closes {moment(quiz.close).format('DD MMMM, hh:mm A')}</Text>
			</Stack>
			<Stack spacing={6}>
				<Title order={5}>Number of Questions</Title>
				<Text>{quiz.numQuestions}</Text>
			</Stack>
			<Stack spacing={6}>
				<Title order={5}>Your Previous Attempts</Title>
				<Text>{quiz.numQuestions}</Text>
			</Stack>

		</Stack>
	)
}