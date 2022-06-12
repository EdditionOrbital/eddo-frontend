import { useQuery } from "@apollo/client"
import { Box, Button, Container, Group, SimpleGrid, Space, Stack, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { CONTEXT_MODULES } from "../../queries/modules"
import { currentSem, currentYear } from "../../utils/currentYearSemester"
import AllModuleItem from "../../components/modules/AllModuleItem/AllModuleItem"
import { Module } from "../../types/module.type"

const categories = ['Enrolled', 'All', 'Coursera', 'Other']

const AllModulesPage = () => {

    const [category, setCategory] = useState(categories[0])
    const buttons = categories.map(c => 
        <Button 
        key={c}
        variant={category === c ? 'filled' : 'light'}
        onClick={() => setCategory(c)} 
        >
            {c} Modules
        </Button>
    )

    const [filteredModules, setFilteredModules] = useState([])
    const {loading, error, data} = useQuery(CONTEXT_MODULES)

    useEffect(() => {
        var newFilteredModules = []
        if (loading) return
        else if (error) console.log(error)
        else try { newFilteredModules = data.contextModules } catch {}
        if (!newFilteredModules) return
        switch (category) {
            case categories[0]:
                newFilteredModules = newFilteredModules.filter((m : Module) => m.year === currentYear && m.semester === currentSem)
                break
            default:
                break
        }
        newFilteredModules = newFilteredModules.slice().sort((a: Module, b: Module) => b.semester - a.semester)
        newFilteredModules = newFilteredModules.slice().sort((a: Module, b: Module) => b.year - a.year)
        setFilteredModules(newFilteredModules)
    }, [loading, error, data, category])

    return (
        <Box p={24} style={{ width: '90%', maxWidth: 1500 }}>
            <Stack>
                <Title order={2}>Your Modules</Title>
                <Space/>
                <Group spacing='xs'>
                    {buttons}
                </Group>
                <SimpleGrid cols={1} breakpoints={[{minWidth: 'sm', cols: 2}, {minWidth: 'md', cols: 3}]}>
                    {filteredModules.map((m: Module) => <AllModuleItem key={m.code} module={m}/>)}
                </SimpleGrid>
            </Stack>
        </Box>
    )

}

export default AllModulesPage