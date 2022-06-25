import { Anchor, Avatar, Badge, Card, Group, SimpleGrid, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Module } from "../types/module.type";

const workloadLabels = ['Preparation', 'Lecture', 'Tutorial', 'Seminar', 'Laboratory']

interface ModuleDetailsProps {
	module: Module
}

export default function ModuleDetails(props: ModuleDetailsProps) {
	const workload = [4,2,0,1,2]

	return (
		<Stack spacing={48}>
			<Stack spacing='sm'>
				<Title order={3}>Description</Title>
				<Text size='lg'>{props.module.description}</Text>
			</Stack>
			<Stack spacing='sm'>
				<Title order={3}>Teaching Staff</Title>
				<SimpleGrid breakpoints={[{ minWidth: 'sm', cols: 1}, { minWidth: 'md', cols: 2}, { minWidth: 'lg', cols: 3}]}>
					<Card withBorder p='md' shadow='sm'>
						<Group align='flex-start'>
							<Stack spacing='xs'>
								<Stack spacing={0}>
									<Text size='xs'>Associate Professor</Text>
									<Title order={4}>John Doe</Title>
									<Anchor mt={12} size="xs">dcsjohn@comp.nus.edu.sg</Anchor>
								</Stack>
								<Group spacing='xs'>
									<Badge size='sm'>Lecture 1</Badge>
									<Badge size='sm'>Tutorial 1</Badge>
								</Group>
								
							</Stack>
							
						</Group>
					</Card>
				</SimpleGrid>
			</Stack>
			<Stack spacing='sm'>
				<Title order={3}>Workload</Title>
				<Group>
					{workload.map((w, i) => (
						<Tooltip label={workloadLabels[i]}>
							<Avatar color='purple'>{w.toString()}</Avatar>
						</Tooltip>
					))}
				</Group>
			</Stack>
			<Stack spacing='sm'>
				<Title order={3}>Credits</Title>
				<Text size='lg'>4 Modular Credits</Text>
			</Stack>
		</Stack>
	)
}