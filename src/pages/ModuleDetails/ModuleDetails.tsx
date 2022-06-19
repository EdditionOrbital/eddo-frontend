import { Stack, Text, Title } from "@mantine/core";
import { Module } from "../../types/module.type";

export default function ModuleDetails({module} : {module: Module}) {
	return (
		<Stack spacing={48}>
			<Stack>
				<Title order={3}>Description</Title>
				<Text size='lg'>{module.description}</Text>
			</Stack>
			<Stack>
				<Title order={3}>Credits</Title>
				<Text size='lg'>4</Text>
			</Stack>
		</Stack>
	)
}