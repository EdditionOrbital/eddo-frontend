import { Card, SimpleGrid, Stack, Text, Timeline, Title } from "@mantine/core";
import { Bell, File, GitPullRequest, MessageDots } from "tabler-icons-react";

export default function ModuleDashboard() {
	console.log('hi')
	return (
		<SimpleGrid spacing={48} breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 2}]}>
			<Stack>
				<Card p='lg' withBorder shadow='sm'>
					<Title order={3}>Latest announcements</Title>
				</Card>
				<Card p='lg' withBorder shadow='sm'>
					<Title order={3}>Latest files</Title>
				</Card>
				<Card p='lg' withBorder shadow='sm'>
					<Title order={3}>Latest assignments</Title>
				</Card>
			</Stack>
			<Timeline active={-1} bulletSize={24} lineWidth={2}>
				<Timeline.Item bullet={<MessageDots size={12} />}  title="New quiz">
					<Text color="dimmed" size="sm">Quiz 1 Available</Text>
					<Text size="xs" mt={4}>12 minutes ago</Text>
				</Timeline.Item>
				<Timeline.Item bullet={<GitPullRequest size={12} />} title="New announcement">
					<Text color="dimmed" size="sm">Announcement Example 2</Text>
					<Text size="xs" mt={4}>34 minutes ago</Text>
				</Timeline.Item>
				<Timeline.Item bullet={<Bell size={12} />} title="New announcement">
					<Text color="dimmed" size="sm">Announcement Example</Text>
					<Text size="xs" mt={4}>52 minutes ago</Text>
				</Timeline.Item>
				<Timeline.Item bullet={<File size={12}/>} title="New file">
					<Text color="dimmed" size="sm">File Example.txt</Text>
					<Text size="xs" mt={4}>2 hours ago</Text>
				</Timeline.Item>
			</Timeline>
		</SimpleGrid>
	)
}