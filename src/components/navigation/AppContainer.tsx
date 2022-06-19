import { AppShell } from "@mantine/core"
import React, { useState } from "react"
import { User } from "../../types/user.type"
import EddoHeader from "./EddoHeader"
import EddoNavbar from "./EddoNavbar"

const AppContainer = ({children, user}: {children: React.ReactNode, user: User}) => {

    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    return (
        <AppShell 
            padding='xl' 
            navbar={<EddoNavbar user={user} hidden={!opened}/>} 
            header={<EddoHeader toggle={toggle}/>}
        >
            {children}
        </AppShell>
    )
}

export default AppContainer