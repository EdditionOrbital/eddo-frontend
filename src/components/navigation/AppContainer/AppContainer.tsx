import { AppShell } from "@mantine/core"
import React, { useState } from "react"
import EddoHeader from "../EddoHeader/EddoHeader"
import NavMenuMobile from "../NavMenuMobile/NavMenuMobile"

const AppContainer = ({logout, children}: {logout: () => void, children: React.ReactNode}) => {

    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    return (
        <AppShell padding='md' header={<EddoHeader logout={logout} opened={opened} toggle={toggle}/>} navbar={<NavMenuMobile logout={logout} hide={!opened}/>}>
            {children}
        </AppShell>
    )
}

export default AppContainer