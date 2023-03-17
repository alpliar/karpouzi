import { ButtonProps } from '@chakra-ui/button';
import { ColorMode, useColorMode } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Stack, Wrap } from '@chakra-ui/layout';
import { EffectProps, ThemingProps } from '@chakra-ui/system';
import { useIntl } from 'react-intl';
import NavDrawer from './BavDrawer';
import NavThemeToggle from './NavThemeToggle';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import { BASE_TRANSITION } from '../constants/ui/transitions';
import NavCart from '../redux/container/navCart';
import NavLocaleSelector from '../redux/container/navLocaleSelector';
import NavLogin from '../redux/container/navLogin';
import NavLogo from '../redux/container/navLogo';
import Link from './Link';
import NavBurgerMenu from './NavBurgerMenu';
import NavDrawerBody from './NavDrawerBody';

export const headerBgGradient = (
    colorMode: ColorMode,
    colorScheme: ThemingProps['colorScheme'] = 'green'
) => {
    return colorMode === 'light'
        ? `linear(to-t, ${colorScheme}.300, ${colorScheme}.400)`
        : `linear(to-b, ${colorScheme}.700, ${colorScheme}.800)`;
};

export const headerBgColor = (
    colorMode: ColorMode,
    colorScheme: ThemingProps['colorScheme'] = 'green'
) => {
    return colorMode === 'light' ? `${colorScheme}.400` : `${colorScheme}.700`;
};
interface HeaderProps {
    colorScheme: ThemingProps['colorScheme'];
}
const Header: React.FC<HeaderProps> = ({ colorScheme = 'green' }) => {
    const { colorMode } = useColorMode();
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { formatMessage } = useIntl();

    const boxShadow: EffectProps['boxShadow'] = undefined;
    const headerButtonStyle: ButtonProps = {
        size: 'xs',
        variant: 'ghost',
        color: 'currentColor',
        padding: 2
    };

    const headerLinks = [
        {
            label: formatMessage({ id: 'menuEntryShop' }),
            href: '/shop'
        },
        {
            label: formatMessage({ id: 'menuEntryBlog' }),
            href: '/blog'
        }
    ];
    return (
        <>
            <Flex
                zIndex={5}
                boxShadow={boxShadow}
                as="nav"
                data-e2e="mainNavigation"
                bgColor={headerBgColor(colorMode, colorScheme)}
                position="relative">
                <Wrap
                    align={{ base: 'auto', md: 'center' }}
                    justify="flex-end"
                    maxW={APP_MAX_WIDTH}
                    margin="auto"
                    w="100%"
                    p={{ base: 1, sm: 2 }}
                    spacing={{ base: 0, sm: 2 }}>
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
                            spacing={{ base: 0, sm: 2 }}
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
                                    fontSize="md"
                                    key={index}
                                    asButton
                                    buttonProps={headerButtonStyle}
                                    href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Flex>
                    <Flex gap={{ base: 0, sm: 1 }} wrap="wrap" alignItems="center">
                        <Flex display={{ base: 'none', sm: 'inherit' }} alignItems="center">
                            <Flex gap="1" wrap="wrap" display={{ base: 'none', sm: 'flex' }}>
                                <NavThemeToggle />
                                <NavLocaleSelector compact />
                            </Flex>
                        </Flex>
                        <NavCart />
                        <NavLogin />
                        <Box display={{ base: 'block', md: 'none' }}>
                            <NavBurgerMenu handleClick={onToggle} />
                            <NavDrawer
                                isOpen={isOpen}
                                onClose={onClose}
                                body={<NavDrawerBody />}
                                footer={
                                    <Flex wrap="wrap" gap="1">
                                        <NavThemeToggle compact={false} />
                                        <NavLocaleSelector compact={false} />
                                    </Flex>
                                }></NavDrawer>
                        </Box>
                    </Flex>
                </Wrap>
            </Flex>
        </>
    );
};

export default Header;
