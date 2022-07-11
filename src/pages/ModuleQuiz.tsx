import { Route, Routes } from "react-router-dom";
import QuizList from "../components/quiz/QuizList";
import QuizView from "../components/quiz/QuizView";

export default function ModuleQuiz() {
	return (
		<Routes>
			<Route path="/" element={<QuizList/>}/>
			<Route path="/create" element={<QuizView/>}/>
			<Route path="/:quizId" element={<QuizView/>}/>
		</Routes>
	)
}