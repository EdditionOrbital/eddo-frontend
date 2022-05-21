import { useQuery } from "@apollo/client"
import { Button, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AllModulesItem from "./AllModulesItem/AllModulesItem"
import { currentSem, currentYear } from "../../services/currentYearSemester"
import { CURRENT_USER_MODULES } from "./_queries"

const options = ['Enrolled', 'All', 'Non-Academic']

const AllModulesPage = ({user}) => {

    const [mode, setMode] = useState(options[0])
    const [filteredModules, setFilteredModules] = useState([])
    const getButtonColorScheme = (o) => o === mode ? 'purple' : 'gray'

    const {loading, error, data} = useQuery(CURRENT_USER_MODULES)

    useEffect(() => {
        if (loading) console.log('Loading modules...')
        if (error) console.log(error)
        var res = []
        try {
            res = data.currentUserModules
        } catch {}
        switch (mode) {
            case options[0]:
                res = res.filter(m => m.year === currentYear && m.semester === currentSem)
                break;
            default:
                break;
        }
        setFilteredModules(res)
    }, [loading, error, data, mode])

    return (
        <VStack spacing={8} alignItems='baseline'>
            <Heading colorScheme='gray'>Your Modules</Heading>
            <SimpleGrid minChildWidth={100} spacing={4} w='full' maxWidth='600px'>
                {options.map(
                    o => <Button key={o} colorScheme={getButtonColorScheme(o)} onClick={() => setMode(o)}>
                        {o}
                    </Button>
                )}
            </SimpleGrid>
            <SimpleGrid minChildWidth={300} spacing={4} w='full'>
                {filteredModules.map(m => <AllModulesItem module={m}/>)}
            </SimpleGrid>
            
        </VStack>
    )
}
export default AllModulesPage