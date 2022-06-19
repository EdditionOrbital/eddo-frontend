import { Card, Stack, Text, Title } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { Module } from "../../types/module.type"
import { currentSem, currentYear } from "../../utils/currentYearSemester"

const AllModuleItem = ({module} : {module : Module}) => {

    const isCurrentSemMod = module.year === currentYear && module.semester === currentSem
    const navigate = useNavigate()
    const handleModuleClick = () => {
        isCurrentSemMod && navigate(`/modules/${module.id}`)
    }

    return (
        <Card onClick={handleModuleClick} withBorder className="fade-hover-card" style={{opacity: isCurrentSemMod ? 1 : 0.3}}>
            <Stack>
                <Stack spacing={4}>
                    <Text size="md">{module.code}</Text>
                    <Title order={4}>{module.title}</Title>
                </Stack>
                <Stack>
                    <Title order={5} style={{opacity:0.4}}>No files to show</Title>
                </Stack>
                <Text size="sm">{module.year % 2000}/{(module.year + 1) % 2000} Semester {module.semester}</Text>
            </Stack>
        </Card>
    )
}

export default AllModuleItem