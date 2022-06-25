import { Group, Image, MediaQuery, Title } from "@mantine/core"
import LogoPartial from '../../assets/logo/eddo-logo.svg'

interface LogoProps {
    height: number
}

const Logo = (props: LogoProps) => {
    return (
        <Group position='left' spacing='xs'>
            <Image height={props.height} width={props.height} style={{margin:0}} fit='contain' src={LogoPartial}/>
            <MediaQuery smallerThan='sm' styles={{display: 'none'}}>
                <Title order={2}>eddo</Title>
            </MediaQuery>
        </Group>
    )
}

export default Logo