import { AppShell } from "@mantine/core"
import React, { useState } from "react"
import EddoHeader from "../EddoHeader/EddoHeader"
import EddoNavbar from "../EddoNavbar/EddoNavbar"

const AppContainer = ({logout, children}: {logout: () => void, children: React.ReactNode}) => {

    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    return (
        <AppShell 
            padding='xl' 
            navbar={<EddoNavbar hidden={!opened} logout={logout}/>} 
            header={<EddoHeader toggle={toggle}/>}
        >
            {children}
        </AppShell>
    )
}

export default AppContainer