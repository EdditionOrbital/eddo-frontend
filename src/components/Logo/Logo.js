import { HStack, Image, Text } from "@chakra-ui/react"
import Emblem from './Emblem.svg'

const Logo = ({truncated, height}) => {

    return (
        <HStack height={height}>
            <Image src={Emblem} maxH={height}/>
            {
                truncated ? <></> :
                <Text fontWeight='medium' fontSize={`calc(${height} * 0.8)`} color="#34495E">eddo</Text>
            }
        </HStack>
    )

}

export default Logo