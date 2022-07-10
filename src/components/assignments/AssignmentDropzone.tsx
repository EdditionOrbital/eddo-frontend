import { useMutation } from "@apollo/client";
import { Anchor, Button, Group, Space, Stack, Text, Title } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CREATE_ASSIGNMENT_SUBMISSION } from "../../queries/assignmentSubmission";
import { UserContext } from "../../services/userContextProvider";

export default function AssignmentDropzone() {
	const [files, setFiles] = useState<File[]>([])
	const { assignmentId } = useParams()
	const { user, setUser } = useContext(UserContext)
	const [createAssignmentSubmission] = useMutation(CREATE_ASSIGNMENT_SUBMISSION, {
		variables: { assignmentId, files: files.map(f => f.name)},
		onCompleted: ({ createAssignmentSubmission }) => {
			const _id = createAssignmentSubmission.response
			if (_id && user) {
				setUser({...user, assignmentSubmissions: [...user.assignmentSubmissions || [], ({ _id, date: new Date().toISOString(), assignmentId: assignmentId || '', files: files.map(f => f.name), score: -1}) ]})
			}
		}
	})
	return (
		<Stack>
			<Title order={4}>Submit Assignment</Title>
			<Dropzone onDrop={setFiles}>
				{(status) => <Text>Drop files here</Text>}
			</Dropzone>
			{
				files.length > 0 && (
					<Stack spacing={6}>
						<Title order={5}>Files Uploaded</Title>
						<Group>
							{
								files.map(f => <Anchor size='sm'>{f.name}</Anchor>)
							}
						</Group>
					</Stack>
				)
			}
			<Space/>
			<Group spacing='xs'>
				<Button disabled={files.length === 0} onClick={() => createAssignmentSubmission()}>Submit</Button>
				<Button color='gray' disabled={files.length === 0} onClick={() => setFiles([])}>Cancel</Button>
			</Group>
		</Stack>
	)
}