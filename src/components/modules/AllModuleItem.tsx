import { Card, Stack, Text, Title } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { Module } from "../../types/module.type"
import { currentSem, currentYear } from "../../utils/currentYearSemester"

interface AllModuleItemProps {
    module: Module
}

const AllModuleItem = (props: AllModuleItemProps) => {

    const isCurrentSemMod = props.module.year === currentYear && props.module.semester === currentSem
    const navigate = useNavigate()
    const handleModuleClick = () => {
        isCurrentSemMod && navigate(`/modules/${props.module.id}`)
    }

    return (
        <Card onClick={handleModuleClick} withBorder className="fade-hover-card" style={{opacity: isCurrentSemMod ? 1 : 0.3}}>
            <Stack>
                <Stack spacing={4}>
                    <Text size="md">{props.module.code}</Text>
                    <Title order={4}>{props.module.title}</Title>
                </Stack>
                <Stack>
                    <Title order={5} style={{opacity:0.4}}>No files to show</Title>
                </Stack>
                <Text size="sm">{props.module.year % 2000}/{(props.module.year + 1) % 2000} Semester {props.module.semester}</Text>
            </Stack>
        </Card>
    )
}

export default AllModuleItem