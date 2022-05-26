import { useQuery } from "@apollo/client"
import { Button, Container, Group, SimpleGrid, Space, Stack, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { CURRENT_USER_MODULES } from "../../queries/modules"
import { currentSem, currentYear } from "../../utils/currentYearSemester"
import AllModuleItem from "../../components/modules/AllModuleItem/AllModuleItem"

const categories = ['Enrolled', 'All', 'Coursera', 'Other']

const AllModulesPage = () => {

    const [category, setCategory] = useState(categories[0])
    const buttons = categories.map(c => 
        <Button 
        variant={category === c ? 'filled' : 'light'}
        onClick={() => setCategory(c)} 
        >
            {c} Modules
        </Button>
    )

    const [filteredModules, setFilteredModules] = useState([])
    const {loading, error, data} = useQuery(CURRENT_USER_MODULES)

    useEffect(() => {
        var res = []
        if (loading) {}
        else if (error) console.log(error)
        else try { res = data.currentUserModules } catch {}
        switch (category) {
            case categories[0]:
                res = res.filter((m : {year: number, semester: number}) => m.year === currentYear && m.semester === currentSem)
                break
            default:
                break
        }
        res = res.slice().sort((a: {semester: number}, b: {semester: number}) => b.semester - a.semester)
        res = res.slice().sort((a: {year: number}, b: {year: number}) => b.year - a.year)
        setFilteredModules(res)
    }, [loading, error, data, category])

    return (
        <Container p={24} size={1600}>
            <Stack>
                <Title order={2}>Your Modules</Title>
                <Space/>
                <Group spacing='xs'>
                    {buttons}
                </Group>
                <SimpleGrid cols={1} breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'md', cols: 3}, {minWidth: 'lg', cols: 4}]}>
                    {filteredModules.map(m => <AllModuleItem module={m}/>)}
                </SimpleGrid>
            </Stack>
        </Container>
    )

}

export default AllModulesPage