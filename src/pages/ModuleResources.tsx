import { useQuery } from "@apollo/client";
import { Group, Stack, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { ArrowBackUp, Folder as FolderIcon } from "tabler-icons-react";
import { READ_MODULE_RESOURCES } from "../queries/files";
import { Module } from "../types/module.type";
import { File, Folder } from "../types/resources.type";

export default function ModuleResources({module} : {module: Module}) {

	const [folders, setFolders] = useState<Folder[]>([])
	const [files, setFiles] = useState<File[]>([])
	const [parentFolder, setParentFolder] = useState<string | null>(null)

	const { loading, data } = useQuery(READ_MODULE_RESOURCES, { variables: module })

	useEffect(() => {
		if (data && data.readModule) {
			setFolders(data.readModule.folders)
			setFiles(data.readModule.files)
			setParentFolder(data.readModule.folders.find((f: Folder) => f.parentFolder === null)?._id || null)
		}
	}, [loading, data])

	const previousFolderId = folders.find(f => f._id === parentFolder)?.parentFolder || null

	return (
		<Stack>
			{/* <Title order={3}>All Resources</Title> */}
			<Table fontSize='sm' verticalSpacing={'sm'}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Type</th>
						<th>Size</th>
					</tr>
				</thead>
				<tbody>
					{ previousFolderId && <tr className="fade-hover-card" style={{cursor: 'pointer'}} onClick={() => setParentFolder(previousFolderId)}><td colSpan={3}><Group><ArrowBackUp/>..</Group></td></tr>}
					{/*Add back row here*/}
					{folders.filter(f => f.parentFolder === parentFolder).map(f => (
						<tr onClick={() => setParentFolder(f._id)} className="fade-hover-card" style={{cursor: 'pointer'}}>
							<td><Group><FolderIcon/>{f.title}</Group></td>
							<td>Folder</td>
							<td>-</td>
						</tr>
					))}
					{files.filter(f => f.parentFolder === parentFolder).map(f => (
						<tr className="fade-hover-card" style={{cursor: 'pointer'}}>
							<td>{f.title}</td>
							<td>-</td>
							<td>{f.size} MB</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Stack>
	)
}