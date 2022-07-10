import { useLazyQuery } from "@apollo/client";
import { Stack, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { READ_CURRENT_USER_ASSIGNMENT_SUBMISSIONS } from "../../queries/assignmentSubmission";
import { UserContext } from "../../services/userContextProvider";
import { AssignmentSubmission } from "../../types/assignment.type";
import AssignmentDropzone from "./AssignmentDropzone";
import AssignmentSubmissionCard from "./AssignmentSubmissionCard";

export default function AssignmentSubmit() {
	const { assignmentId } = useParams()
	const { user, setUser } = useContext(UserContext)
	const [thisSubmission, setThisSubmission] = useState<AssignmentSubmission | undefined | null>(null)
	const [readSubmissions] = useLazyQuery(READ_CURRENT_USER_ASSIGNMENT_SUBMISSIONS, {
		onCompleted: ({ currentUser }) => {
			if (user && currentUser && currentUser.assignmentSubmissions) {
				setUser({...user, ...currentUser})
			}
		}
	})
	useEffect(() => {
		if (user && !user?.assignmentSubmissions) readSubmissions()
		else if (user && user.assignmentSubmissions) {
			setThisSubmission(user.assignmentSubmissions.find(a => a.assignmentId === assignmentId))
		}
	}, [user])
	if (thisSubmission === null) return <></>
	return (
		<>
		{
			user?.__typename === 'Student' && (thisSubmission ? <AssignmentSubmissionCard assignmentSubmission={thisSubmission}/> : <AssignmentDropzone/>)
		}
		</>
	)
}