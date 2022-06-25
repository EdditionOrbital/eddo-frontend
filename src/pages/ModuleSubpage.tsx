import { useQuery } from "@apollo/client";
import { Badge, Box, Group, Space, Stack, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { READ_MODULE_DASHBOARD } from "../queries/modules";
import { UserContext } from "../services/userContextProvider";
import { Module } from "../types/module.type";
import ModuleDashboard from "./ModuleDashboard";
import ModuleDetails from "./ModuleDetails";
import ModuleResources from "./ModuleResources";

interface ModuleSubpageProps {
}

export default function ModuleSubpage(props: ModuleSubpageProps) {
	const { user } = useContext(UserContext)
	const { moduleId } = useParams()
	const [module, setModule] = useState<null | Module>(null)
	const { loading, data } = useQuery(READ_MODULE_DASHBOARD, {
		variables: { id: moduleId }
	})

	useEffect(() => {
		if (data && data.readModule) setModule(data.readModule)
	}, [loading, data])

	if (!module) return <></>

	const lessons = user?.modules.find(mod => mod.moduleId === moduleId)?.lessons || []

	return (
		<Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
			<Stack>
				<Stack spacing={0}>
					<Title order={3} style={{opacity: 0.6}}>{module.code}</Title>
					<Title order={1}>{module.title}</Title>
				</Stack>
				<Group>
					{lessons?.map(l => (
						<Badge size="lg" variant="filled">{l.replace('-', ' ')}</Badge>
					))}
				</Group>
				<Space/>
				<Routes>
					<Route path={`/`} element={<ModuleDashboard/>}/>
					<Route path={`/details`} element={<ModuleDetails module={module}/>}/>
					<Route path={`/resources`} element={<ModuleResources module={module}/>}/>
				</Routes>
			</Stack>
		</Box>
	)

}