import { Badge, MantineSize } from "@mantine/core"

interface TaskCompletionBadgeProps {
	status: string
	size: MantineSize | undefined
}

const TaskCompletionBadge = (props: TaskCompletionBadgeProps) => {
	const color = props.status === 'Completed' ? 'green' : props.status === 'In Progress' ? 'yellow' : 'red'
	return (
		<Badge color={color} size={props.size}>{props.status}</Badge>
	)
}

export default TaskCompletionBadge