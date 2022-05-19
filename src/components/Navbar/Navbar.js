import React, { useState } from 'react';
import {
  Flex,
  Button,
  IconButton,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MenuItems } from './MenuItems';
import Logo from '../Logo/Logo';

export default function Navbar() {
  const [display, changeDisplay] = useState('none');
  const truncated = useBreakpointValue({ base: true, md: false });

  return (
    <Flex>
      <Flex pos="fixed" top="1rem" left="1rem" align="center">
        <Logo truncated={truncated}/>
      </Flex>
      <Flex pos="fixed" top="1rem" right="1rem" align="center">
        <Flex display={['none', 'none', 'flex', 'flex']}>
          {MenuItems.map((item, index) => {
            return (
              <Link href={item.url}>
                <Button as="a" variant="ghost" aria-label={item.title} w="100%">
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={() => changeDisplay('flex')}
        />
      </Flex>
      <Flex
        w="100vw"
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          {MenuItems.map((item, index) => {
            return (
              <Link href={item.url}>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label={item.title}
                  my={2}
                  w="100%"
                >
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
