import { Image } from "@mantine/core"
import LogoFull from './eddo-logo-full.svg'

const Logo = ({height} : {height: number}) => {
    return (
        <Image height={height} width={height * 4.125} fit='contain' src={LogoFull}/>
    )
}

export default Logo