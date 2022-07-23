import { useQuery } from "@apollo/client";
import { ActionIcon, Anchor, Card, Divider, Group, SimpleGrid, Space, Stack, Table, Text, Title } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import { READ_ASSIGNMENT, READ_ASSIGNMENT_WITH_SUBMISSIONS } from "../../queries/assignment";
import { UserContext } from "../../services/userContextProvider";
import { Assignment } from "../../types/assignment.type";
import { EddoCallback } from "../../types/callbacks.type";
import AssignmentDrawer from "./AssignmentDrawer";
import AssignmentSubmit from "./AssignmentSubmit";

export default function AssignmentView() {
	const { user } = useContext(UserContext)
	const { assignmentId } = useParams()
	const navigate = useNavigate()
	const [assignment, setAssignment] = useState<Assignment | null | undefined>(undefined)
	const { data } = useQuery(user?.__typename === 'Student' ? READ_ASSIGNMENT : READ_ASSIGNMENT_WITH_SUBMISSIONS, { variables: { _id: assignmentId }})
	useEffect(() => {
		if (data) setAssignment(data.readAssignment)
	}, [data])
	const [drawerAssignment, setDrawerAssignment] = useState<Assignment | null>(null)
	const close = () => setDrawerAssignment(null)
	if (!assignment) return <></>
	const callbacks: EddoCallback<Assignment> = {
		update: (x) => setAssignment(x),
		create: (x) => {},
		delete: (_id) => {}
	}
	return (
		<>
		<AssignmentDrawer callbacks={callbacks} assignment={drawerAssignment} close={close}/>
		<Stack>
			<Anchor onClick={() => navigate(-1)}>Back to Assignments</Anchor>
			<Divider my='sm'/>
			<SimpleGrid cols={2} spacing='xl'>
				<Stack>
				<Card p='md' withBorder>
					<Group position="apart">
						<Stack spacing={4} mb='xl'>
							<Title order={3}>{assignment.title}</Title>
							<Text size='sm'>Closes {moment(assignment.close).format('DD MMMM, hh:mm A')}</Text>
						</Stack>
						{
							user?.__typename === 'Staff' && (
								<Group>
									<ActionIcon onClick={() => setDrawerAssignment(assignment)}><Pencil/></ActionIcon>
									<ActionIcon color='red'><Trash/></ActionIcon>
								</Group>
							)
						}
					</Group>
					<Stack spacing={24}>
					{
						assignment.instructions && (
							<Stack spacing={4}>
								<Title order={4}>Instructions</Title>
								<div className="dangSetHTML" dangerouslySetInnerHTML={{ __html: assignment.instructions || ''}}/>
							</Stack>
						)
					}
					{
						assignment.files && assignment.files.length > 0 && (
							<Stack spacing={4}>
								<Title order={4}>Files</Title>
								<Group>
								{
									assignment.files.map(a => <Anchor>{a}</Anchor>)
								}
								</Group>
							</Stack>
						)
					}
					{
						assignment.maxScore !== -1 && (
							<Stack spacing={4}>
								<Title order={4}>Maximum Score</Title>
								<Text>{assignment.maxScore}</Text>
							</Stack>
						)
					}
					</Stack>
				</Card>
				</Stack>
				<AssignmentSubmit/>
			</SimpleGrid>
			<Space/>
			{
				user?.__typename !== 'Student' && (
					<Stack>
						<Title order={3}>Submissions</Title>
						<Table verticalSpacing='sm'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Files</th>
									<th>Score</th>
								</tr>
							</thead>
							<tbody>
								{
									assignment.submissions?.map(a => (
										<tr>
											<td>{a.student?.firstName} {a.student?.lastName}</td>
											<td>{a.files.map(x => <Anchor size="sm">{x}</Anchor>)}</td>
											<td>{a.score === -1 ? 'No Score' : a.score}</td>
										</tr>
									))
								}
							</tbody>
						</Table>
					</Stack>
				)
			}
		</Stack>
		</>
	)
}