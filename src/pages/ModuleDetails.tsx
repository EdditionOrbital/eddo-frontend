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
			{ (props.module.staffs?.length || 0) > 0 &&
				<Stack spacing='sm'>
					<Title order={3}>Teaching Staff</Title>
					<SimpleGrid breakpoints={[{ minWidth: 'sm', cols: 1}, { minWidth: 'md', cols: 2}, { minWidth: 'lg', cols: 3}]}>
						{
							props.module.staffs?.map(s => (
								<Card withBorder p='md' shadow='sm'>
									<Group align='flex-start'>
										<Stack spacing='xs'>
											<Stack spacing={0}>
												{/* <Text size='xs'>{s.title}</Text> */}
												<Text size="xs">Lecturer</Text>
												<Title order={4}>{s.firstName} {s.lastName}</Title>
												<Anchor href={`mailto:${s.email}`} mt={12} size="xs">{s.email}</Anchor>
											</Stack>
											{/* <Group spacing='xs'>
												<Badge size='sm'>Lecture 1</Badge>
												<Badge size='sm'>Tutorial 1</Badge>
											</Group> */}
										</Stack>
									</Group>
								</Card>
							))
						}
					</SimpleGrid>
				</Stack>
			}
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