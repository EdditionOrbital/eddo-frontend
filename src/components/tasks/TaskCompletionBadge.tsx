import { Badge, MantineSize } from "@mantine/core"

const TaskCompletionBadge = ({status, size} : {status: string, size: MantineSize | undefined}) => {
	const color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'yellow' : 'red'
	return (
		<Badge color={color} size={size}>{status}</Badge>
	)
}

export default TaskCompletionBadge