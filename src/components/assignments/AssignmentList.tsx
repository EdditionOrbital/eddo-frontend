import { useQuery } from "@apollo/client";
import { Badge, Button, Group, Table, TextInput } from "@mantine/core";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emptyAssignment } from "../../constants/emptyTypes";
import { READ_MODULE_ASSIGNMENTS } from "../../queries/assignment";
import { UserContext } from "../../services/userContextProvider";
import { Assignment } from "../../types/assignment.type";
import { EddoCallback } from "../../types/callbacks.type";
import AssignmentDrawer from "./AssignmentDrawer";

export default function AssignmentList() {
	const { user } = useContext(UserContext)
	const { moduleId } = useParams()
	const navigate = useNavigate()
	const { data } = useQuery(READ_MODULE_ASSIGNMENTS, { variables: { moduleId }})
	const [assignments, setAssignments] = useState<Assignment[]>([])
	useEffect(() => {
		if (data && data.readModule) setAssignments(data.readModule.assignments)
	}, [data])
	const [drawerAssignment, setDrawerAssignment] = useState<Assignment | null>(null)
	const close = () => setDrawerAssignment(null)
	const callbacks: EddoCallback<Assignment> = {
		create: (x) => setAssignments([...assignments, x]),
		update: (x) => {},
		delete: (_id) => {}
	}
	return (
		<>
		<AssignmentDrawer callbacks={callbacks} assignment={drawerAssignment} close={close}/>
		<Group>
			<TextInput placeholder="Search"/>
			{
				user?.__typename === 'Staff' &&
				<Button onClick={() => setDrawerAssignment(emptyAssignment)} variant="light">Add New</Button>
			}
		</Group>
		<Table verticalSpacing='sm'>
			<thead>
				<tr>
					<th>Open</th>
					<th>Close</th>
					<th>Title</th>
					{/* <th>Status</th> */}
				</tr>
			</thead>
			<tbody>
				{
					assignments.map(a => ({ ...a, avail: moment().isBetween(moment(a.open), moment(a.close))})).map(a => (
						<tr onClick={() => navigate(a._id || '')} className="fade-hover-card" style={{ opacity: moment().isBetween(moment(a.open), moment(a.close)) ? 1 : 0.2}}>
							<td width={150}>{moment(a.open).format('DD/MM/YY, HH:mm')}</td>
							<td width={150}>{moment(a.close).format('DD/MM/YY, HH:mm')}</td>
							<td>{a.title}</td>
							{/* <td width={120}>{<Badge>{status}</Badge>}</td> */}
						</tr>
					))
				}
			</tbody>
		</Table>
		</>
	)
}