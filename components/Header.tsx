import { ButtonProps } from '@chakra-ui/button';
import { ColorMode, useColorMode } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, HStack, Stack, Text, Wrap } from '@chakra-ui/layout';
import { EffectProps } from '@chakra-ui/system';
import PropTypes from 'prop-types';
import { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import NavDrawer from '../components/navDrawer';
import NavThemeToggle from '../components/navThemeToggle';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import { BASE_TRANSITION } from '../constants/ui/transitions';
import NavCart from '../redux/container/navCart';
import NavLocaleSelector from '../redux/container/navLocaleSelector';
import NavLogin from '../redux/container/navLogin';
import NavLogo from '../redux/container/navLogo';
import Link from './link';
import NavBurgerMenu from './navBurgerMenu';
import NavDrawerBody from './navDrawerBody';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const MenuItems: React.FC<PropsWithChildren<IProps>> = ({ children }) => (
    <Text mt={{ base: 0, md: 0 }} mr={6} display={{ base: 'inline', sm: 'inline' }}>
        {children}
    </Text>
);

export const headerBgGradient = (colorMode: ColorMode) => {
    return colorMode === 'light'
        ? 'linear(to-b, green.300, green.400)'
        : 'linear(to-b, green.700, green.800)';
};

export const headerBgColor = (colorMode: ColorMode) => {
    return colorMode === 'light' ? 'green.400' : 'green.800';
};

const Header = ({}) => {
    const { colorMode } = useColorMode();
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const boxShadow: EffectProps['boxShadow'] = undefined;
    const headerButtonStyle: ButtonProps = { size: 'xs', variant: 'ghost', color: 'currentColor' };

    const headerLinks = [
        {
            label: f('menuEntryShop'),
            // helper: f('goToPageName', { name: f('menuEntryShop') }),
            href: '/shop'
        },
        {
            label: f('menuEntryBlog'),
            // helper: f('goToPageName', { name: f('menuEntryBlog') }),
            href: '/blog'
        }
    ];
    return (
        <>
            <Stack /*position="sticky" zIndex="sticky" top="0px" */ spacing={0}>
                <Flex
                    boxShadow={boxShadow}
                    as="nav"
                    data-e2e="mainNavigation"
                    bgColor={headerBgColor(colorMode)}>
                    <Wrap
                        align={{ base: 'auto', md: 'center' }}
                        justify="flex-end"
                        maxW={APP_MAX_WIDTH}
                        margin="auto"
                        w="100%"
                        p={2}>
                        <Flex align="center" mr={{ base: 2, sm: 4 }}>
                            <NavLogo />
                        </Flex>
                        <Flex
                            textAlign={{ base: 'center', md: 'left' }}
                            alignItems="center"
                            justifyContent="center"
                            flexGrow={1}
                            transition={BASE_TRANSITION}>
                            <Stack
                                direction="row"
                                spacing={2}
                                display={{ base: 'none', md: 'block' }}
                                minW="auto"
                                alignItems="left"
                                justifyContent="flex-start"
                                flexWrap="wrap"
                                flexGrow={1}
                                paddingX={2}
                                overflow="hidden">
                                {headerLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        asButton
                                        buttonProps={headerButtonStyle}
                                        href={link.href}>
                                        {link.label}
                                    </Link>
                                ))}
                            </Stack>
                        </Flex>
                        <HStack spacing={1}>
                            <Box display={{ base: 'none', sm: 'block' }}>
                                <HStack spacing="1">
                                    <NavThemeToggle />
                                    <NavLocaleSelector compact />
                                </HStack>
                            </Box>
                            <NavLogin />
                            <NavCart />
                            <Box display={{ base: 'block', md: 'none' }}>
                                <NavBurgerMenu handleClick={onToggle} />
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
            </Stack>
        </>
    );
};

export default Header;

MenuItems.propTypes = {
    children: PropTypes.node
};

Header.propTypes = {
    siteTitle: PropTypes.string
};
