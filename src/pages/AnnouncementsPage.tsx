import { Box, Stack, Title } from "@mantine/core";
import AnnouncementTable from "../components/announcements/AnnouncementTable";

export default function AnnouncementsPage() {
	return (
		<Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
			<Stack style={{width: '100%'}}>
                <Title order={2}>Announcements</Title>
				<AnnouncementTable/>
			</Stack>
		</Box>
	)
}