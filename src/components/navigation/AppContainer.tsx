import { AppShell } from "@mantine/core"
import React, { useContext, useState } from "react"
import { UserContext } from "../../services/userContextProvider"
import EddoHeader from "./EddoHeader"
import EddoNavbar from "./EddoNavbar"

interface AppContainerProps {
    children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
    const {user} = useContext(UserContext)
    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    if (!user) return <></>

    return (
        <AppShell padding='xl' navbar={<EddoNavbar user={user} hidden={!opened}/>} header={<EddoHeader toggle={toggle}/>}>
            {props.children}
        </AppShell>
    )
}

export default AppContainer