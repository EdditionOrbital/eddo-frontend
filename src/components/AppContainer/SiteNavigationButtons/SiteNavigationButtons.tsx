import { Button, Group, Stack } from "@mantine/core"

const routes = [
    { name: "Home", url: '/' },
    { name: "Modules", url: '/modules' },
    { name: "Email", url: '/' },
    { name: "Timetable", url: '/' }
]

const SiteNavigationButtons = ({smallScreen}: {smallScreen: boolean | undefined}) => {

    const size = smallScreen ? 'md' : undefined
    const variant = smallScreen ? 'light' : 'subtle'
    const color = smallScreen ? undefined : 'dark'
    const buttonGroup = routes.map(x => <Button component="a" href={x.url} color={color} variant={variant} size={size} compact={!smallScreen}>{x.name}</Button>)

    return (
        smallScreen ? <Stack justify="flex-start">{buttonGroup}</Stack> : <Group>{buttonGroup}</Group>
    )
}

export default SiteNavigationButtons