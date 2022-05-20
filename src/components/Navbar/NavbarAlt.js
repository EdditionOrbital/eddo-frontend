import React, { useState } from 'react';
import {
  Flex,
  Button,
  IconButton,
  Link,
  HStack,
  Spacer,
  useColorModeValue,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MenuItems } from './MenuItems';
import Logo from '../Logo/Logo';
import { isMobile } from 'react-device-detect';

const MenuButtons = (
  <Flex w='full' maxW={800}>
    <Spacer/>
    {MenuItems.map(i => 
      <Link href={i.url}>
        <Button variant='ghost' w='full' size='md'>{i.title}</Button>
      </Link>
    )}
  </Flex>
)

const MobileMenuButtons = (
  <VStack w='full'>
    {MenuItems.map(i => 
      <Link href={i.url} w='full'>
        <Button variant='ghost' w='full' size='md'>{i.title}</Button>
      </Link>
    )}
  </VStack>
)


export default function NavbarAlt() {

  const [shown, setShown] = useState(false)
  const isSmallScreen = useBreakpointValue({base: true, md: false});

  return (
    <VStack pl={8} pr={8} pb={4} pt={4} borderBottom='1px' minH='84px' borderColor={useColorModeValue('gray.100', 'gray.700')}>
      <HStack w='full' >
        <Logo height='36px' truncated={isMobile}/>
        <Spacer/>
        {(isMobile || isSmallScreen ) ? <IconButton variant='ghost' size='lg' onClick={() => setShown(!shown)} icon={shown ? <CloseIcon/> : <HamburgerIcon/>}/> : MenuButtons}
      </HStack>
      {(isMobile || isSmallScreen ) && shown ? MobileMenuButtons : <></>}
    </VStack> 
  )

}
