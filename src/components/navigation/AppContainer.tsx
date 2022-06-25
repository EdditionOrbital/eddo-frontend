import { AppShell } from "@mantine/core"
import React, { useState } from "react"
import { User } from "../../types/user.type"
import EddoHeader from "./EddoHeader"
import EddoNavbar from "./EddoNavbar"

interface AppContainerProps {
    user: User
    children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    return (
        <AppShell padding='xl' navbar={<EddoNavbar user={props.user} hidden={!opened}/>} header={<EddoHeader toggle={toggle}/>}>
            {props.children}
        </AppShell>
    )
}

export default AppContainer