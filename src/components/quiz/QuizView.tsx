import { Anchor, Divider, Stack } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../services/userContextProvider";
import ModifyQuiz from "./ModifyQuiz";
import QuizAttempt from "./QuizAttempt";

export default function QuizView() {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	return (
		<Stack>
			<Anchor onClick={() => navigate(-1)}>Back to Quizzes</Anchor>
			<Divider my='sm'/>
			{
				user?.__typename === 'Staff' ? <ModifyQuiz/> : <QuizAttempt/>
			}
		</Stack>
	)
}