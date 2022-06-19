import { Group, Image, MediaQuery, Title } from "@mantine/core"
import LogoPartial from './eddo-logo.svg'

const Logo = ({height} : {height: number}) => {
    return (
        <Group position='left' spacing='xs'>
            <Image height={height} width={height} style={{margin:0}} fit='contain' src={LogoPartial}/>
            <MediaQuery smallerThan='sm' styles={{display: 'none'}}>
                <Title order={2}>eddo</Title>
            </MediaQuery>
        </Group>
    )
}

export default Logo