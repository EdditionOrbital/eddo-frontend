import { Route, Routes } from "react-router-dom";
import AssignmentList from "../components/assignments/AssignmentList";
import AssignmentView from "../components/assignments/AssignmentView";

export default function ModuleAssignments() {
	return (
		<Routes>
			<Route path="/" element={<AssignmentList/>}/>
			<Route path="/:assignmentId" element={<AssignmentView/>}/>
		</Routes>
	)
}