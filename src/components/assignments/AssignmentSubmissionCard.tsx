import { useMutation } from "@apollo/client";
import { ActionIcon, Anchor, Card, Group, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect } from "react";
import { Trash } from "tabler-icons-react";
import { DELETE_ASSIGNMENT_SUBMISSION } from "../../queries/assignmentSubmission";
import { UserContext } from "../../services/userContextProvider";
import { AssignmentSubmission } from "../../types/assignment.type";

interface AssignmentSubmissionCardProps {
	assignmentSubmission: AssignmentSubmission
}

export default function AssignmentSubmissionCard(props: AssignmentSubmissionCardProps) {
	const { user, setUser } = useContext(UserContext)
	const [deleteAssignmentSubmission] = useMutation(DELETE_ASSIGNMENT_SUBMISSION, {
		variables: { _id: props.assignmentSubmission._id },
		onCompleted: ({ deleteAssignmentSubmission }) => {
			if (user && deleteAssignmentSubmission.response) {
				setUser({...user, assignmentSubmissions: user?.assignmentSubmissions ? user.assignmentSubmissions.filter(a => a.assignmentId !== props.assignmentSubmission.assignmentId) : []})
			}
		}
	})
	return (
		<Stack>
			<Card withBorder p='sm'>
				<Stack>
					<Stack spacing={4}>
						<Group position="apart">
							<Title order={5}>Submission Time</Title>
							<ActionIcon size={20} color='red' onClick={() => deleteAssignmentSubmission()}><Trash/></ActionIcon>
						</Group>
						<Text size="sm">{moment(props.assignmentSubmission.date).format('DD/MM/YY, hh:mm A')}</Text>
					</Stack>
					<Stack spacing={4}>
						<Title order={5}>Files</Title>
						{
							props.assignmentSubmission.files.map(f => (
								<Anchor size="sm">{f}</Anchor>
							))
						}
					</Stack>
				</Stack>
			</Card>
		</Stack>
	)
}