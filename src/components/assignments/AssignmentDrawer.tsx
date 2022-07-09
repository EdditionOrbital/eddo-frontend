import { Button, Checkbox, Drawer, Group, SimpleGrid, Space, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { emptyAssignment } from "../../constants/emptyTypes";
import { Assignment } from "../../types/assignment.type";
import { RichTextEditor } from '@mantine/rte'
import moment from "moment";
import { useMutation } from "@apollo/client";
import { CREATE_ASSIGNMENT, UPDATE_ASSIGNMENT } from "../../queries/assignment";
import { EddoCallback } from "../../types/callbacks.type";

interface AssignmentDrawerProps {
	assignment: Assignment | null
	callbacks: EddoCallback<Assignment>
	close: () => void
}

export default function AssignmentDrawer(props: AssignmentDrawerProps) {
	const form = useForm({ initialValues: {...emptyAssignment, open: new Date(emptyAssignment.open), openTime: new Date(emptyAssignment.open), close: new Date(emptyAssignment.close), closeTime: new Date(emptyAssignment.close)}})
	const { moduleId } = useParams()
	useEffect(() => {
		if (!props.assignment) {
			form.setValues({...emptyAssignment, open: new Date(emptyAssignment.open), openTime: new Date(emptyAssignment.open), close: new Date(emptyAssignment.close), closeTime: new Date(emptyAssignment.close)})
		} else {
			form.setValues({...props.assignment, open: new Date(props.assignment.open), openTime: new Date(props.assignment.open), close: new Date(props.assignment.close), closeTime: new Date(props.assignment.open)})
		}
	}, [props.assignment])
	const [createAssignment] = useMutation(CREATE_ASSIGNMENT, {
		variables: { ...form.values, 
			open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
			close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString(),
			moduleId
		},
		onCompleted: ({ createAssignment }) => {
			if (createAssignment.response) {
				props.callbacks.create({ ...form.values, 
					open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
					close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString()
				})
				props.close()
			}
		}
	})
	const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT, {
		variables: { ...form.values, 
			open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
			close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString()
		},
		onCompleted: ({ updateAssignment }) => {
			if (updateAssignment.response) {
				props.callbacks.update({ ...form.values, 
					open: moment(moment(form.values.open).format('YYYY-MM-DD') + 'T' + moment(form.values.openTime).format('HH:mm:ss') + '+08:00').toISOString(),
					close: moment(moment(form.values.close).format('YYYY-MM-DD') + 'T' + moment(form.values.closeTime).format('HH:mm:ss') + '+08:00').toISOString()
				})
				props.close()
			}
		}
	})
	const title = form.values._id ? form.values.title !== '' ? form.values.title : props.assignment?.title || '' : 'New Assignment'
	// console.log()
	console.log(form.values.instructions)
	return (
		<Drawer position="right" size='xl' opened={!!props.assignment} onClose={props.close} title={title} styles={{title: { fontWeight: 'bold'}}} padding='lg'>
			<Stack>
				<TextInput label='Assignment Title' {...form.getInputProps('title')}/>
				<Space mt='sm'/>
				<Group>
					<DatePicker  label='Open Date' {...form.getInputProps('open')}/>
					<TimeInput label='Open Time' {...form.getInputProps('openTime')}/>
				</Group>
				<Group>
					<DatePicker  label='Close Date' {...form.getInputProps('close')}/>
					<TimeInput label='Close Time' {...form.getInputProps('closeTime')}/>
				</Group>
				<Space mt='sm'/>
				<Stack spacing={6}>
					<Text size="md">Instructions</Text>
					<RichTextEditor value={form.values.instructions || ''} {...form.getInputProps('instructions')}/>
				</Stack>
				<Space mt='sm'/>
				<Group>
					<Button onClick={() => props.assignment?._id ? updateAssignment() : createAssignment()}>
						{props.assignment?._id ? 'Update' : 'Add'}
					</Button>
				</Group>
			</Stack>
		</Drawer>
	)
}