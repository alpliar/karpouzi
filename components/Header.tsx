import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, HStack, Text, Wrap } from '@chakra-ui/layout';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import NavDrawer from '../components/navDrawer';
import NavThemeToggle from '../components/navThemeToggle';
import { BASE_TRANSITION } from '../constants/ui/transitions';
import NavCart from '../container/navCart';
import NavLocaleSelector from '../container/navLocaleSelector';
import NavLogin from '../container/navLogin';
import NavLogo from '../container/navLogo';
import NavBurgerMenu from './navBurgerMenu';
import NavDrawerBody from './navDrawerBody';

const MenuItems = ({ children }) => (
    <Text mt={{ base: 0, md: 0 }} mr={6} display={{ base: 'inline', sm: 'inline' }}>
        {children}
    </Text>
);

const Header = ({ siteTitle }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex as="nav" data-e2e="mainNavigation" bg="teal.600" color="white">
            <Wrap
                align={{ base: 'auto', md: 'center' }}
                justify="flex-end"
                maxW={{ md: '4xl' }}
                w="100%"
                p={2}
                m={{ base: 0, md: 'auto' }}>
                <Flex align="center" mr={{ base: 2, sm: 5 }}>
                    <NavLogo /* siteTitle={siteTitle} */ />
                </Flex>
                <Flex
                    textAlign={{ base: 'center', md: 'inherit' }}
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={1}
                    transition={BASE_TRANSITION}>
                    <Box
                        display={{ base: 'none', md: 'block' }}
                        minW="auto"
                        alignItems="left"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        flexGrow={1}>
                        <MenuItems>
                            <Link href="/blog">
                                <a title={f('goToPageName', { name: f('menuEntryBlog') })}>
                                    {f('menuEntryBlog')}
                                </a>
                            </Link>
                        </MenuItems>
                        <MenuItems>
                            <Link href="/shop">
                                <a title={f('goToPageName', { name: f('menuEntryShop') })}>
                                    {f('menuEntryShop')}
                                </a>
                            </Link>
                        </MenuItems>
                    </Box>
                </Flex>
                <HStack spacing={1}>
                    <Box display={{ base: 'none', sm: 'block' }}>
                        <HStack spacing="1">
                            <NavThemeToggle />
                            <NavLocaleSelector />
                        </HStack>
                    </Box>
                    <NavLogin />
                    <NavCart />
                    <Box display={{ base: 'block', md: 'none' }}>
                        <NavBurgerMenu handleClick={onOpen} />
                        <NavDrawer
                            isOpen={isOpen}
                            onClose={onClose}
                            body={<NavDrawerBody />}
                            footer={
                                <HStack spacing="1">
                                    <NavThemeToggle compact={false} />
                                    <NavLocaleSelector compact={false} />
                                </HStack>
                            }></NavDrawer>
                    </Box>
                </HStack>
            </Wrap>
        </Flex>
    );
};

export default Header;

MenuItems.propTypes = {
    children: PropTypes.node
};

Header.propTypes = {
    siteTitle: PropTypes.string
};
