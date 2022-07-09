import { useQuery } from "@apollo/client";
import { ActionIcon, Anchor, Divider, Group, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import { READ_ASSIGNMENT } from "../../queries/assignment";
import { UserContext } from "../../services/userContextProvider";
import { Assignment } from "../../types/assignment.type";
import { EddoCallback } from "../../types/callbacks.type";
import AssignmentDrawer from "./AssignmentDrawer";

export default function AssignmentView() {
	const { user } = useContext(UserContext)
	const { assignmentId } = useParams()
	const navigate = useNavigate()
	const [assignment, setAssignment] = useState<Assignment | null | undefined>(undefined)
	const { data } = useQuery(READ_ASSIGNMENT, { variables: { _id: assignmentId }})
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
					<Stack spacing='xs'>
						<Title order={4}>Instructions</Title>
						<div className="dangSetHTML" dangerouslySetInnerHTML={{ __html: assignment.instructions || ''}}/>
					</Stack>
				)
			}
			{
				assignment.files && assignment.files.length > 0 && (
					<Stack spacing='xs'>
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
				assignment.maxScore && (
					<Stack spacing='xs'>
						<Title order={4}>Maximum Score</Title>
						<Text>{assignment.maxScore}</Text>
					</Stack>
				)
			}
			</Stack>
		</Stack>
		</>
	)
}