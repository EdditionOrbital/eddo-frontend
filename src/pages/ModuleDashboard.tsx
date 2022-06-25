import { Card, SimpleGrid, Stack, Title } from "@mantine/core";
import { useState } from "react";

export default function ModuleDashboard() {
	const [latestAnnouncements, setLatestAnnouncements] = useState([])
	const [latestFiles, setLatestFiles] = useState([])
	const [latestAssignments, setLatestAssignments] = useState([])
	return (
		<Stack>
			<Title order={2}>New Assignments</Title>
			<SimpleGrid breakpoints={[{ minWidth: 'sm', cols: 1}, {minWidth: 'md', cols: 2}, { minWidth: 'lg', cols: 3}]}>
				<Card withBorder p='md'>
					<Title order={4}>Filename</Title>
				</Card>
			</SimpleGrid>
		</Stack>
	)
}