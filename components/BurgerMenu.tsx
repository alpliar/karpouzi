import { Box, Stack, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { chakra } from '@chakra-ui/react';
import styles from './BurgerMenu.module.css';
import { Icon, HamburgerIcon } from '@chakra-ui/icons';
import NavButton from './navButton';
import { headerBgColor } from './Header';
import { useColorMode } from '@chakra-ui/color-mode';

const BurgerMenu = () => {
    const { colorMode } = useColorMode();
    // Credits to Erik Terwan @ https://codepen.io/erikterwan/pen/EVzeRP
    return (
        <Box className={styles.menuToggle} position="relative">
            {/* 
            A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it. 
            */}
            <chakra.input type="checkbox" w="full" h="full" zIndex={1} />

            <Box zIndex={10}>
                <NavButton
                    e2e="menuCTA"
                    icon={<Icon as={HamburgerIcon} />}
                    label="toto"
                    isPrimary={true}
                    zIndex={10}
                />
            </Box>

            {/* Some spans to act as a hamburger.    
    They are acting like a real hamburger,
    not that McDonalds stuff. */}

            {/* <span></span>
            <span></span>
            <span></span> */}

            <Stack
                position="absolute"
                top={0}
                zIndex={1}
                right={0}
                spacing={4}
                as="ul"
                fontSize="xl"
                className={styles.menu}
                w={{ base: 'xs', sm: '2xs' }}
                maxW="90vw"
                minH="md"
                margin={-2}
                padding={4}
                paddingTop={16}
                bgColor={headerBgColor(colorMode)}
                boxShadow="dark-lg">
                <Text as="li">test</Text>
                <Text as="li">test 2</Text>
            </Stack>
            {/* <NavDrawer
                            isOpen={isOpen}
                            onClose={onClose}
                            body={<NavDrawerBody />}
                            footer={
                                <HStack spacing="1">
                                    <NavThemeToggle compact={false} />
                                    <NavLocaleSelector compact={false} />
                                </HStack>
                            }></NavDrawer> */}
        </Box>
    );
};

export default BurgerMenu;
