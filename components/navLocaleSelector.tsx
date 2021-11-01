import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Link, LinkBox, LinkOverlay, Stack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { background } from '@chakra-ui/styled-system';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaFlag } from 'react-icons/fa';
import getFlagEmoji from '../utils/flags';
import NextLink from 'next/link';

const NavLocaleSelector = ({ compact }) => {
    const router = useRouter();
    const handleSelection = (newLocale) => {
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    const localesInfos = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        gr: 'Ελληνικά'
    };

    const colorScheme = useColorModeValue('teal', 'whiteAlpha');
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'sm';

    return (
        <Menu>
            <MenuButton
                data-e2e="localeCTA"
                aria-label="Toggle locale"
                size={size}
                color="white"
                colorScheme={colorScheme}
                as={compact === true ? IconButton : Button}
                icon={compact === true && <FaFlag />}>
                {compact === false && 'Language'}
            </MenuButton>
            <MenuList
                padding="0"
                minW={'4xs'}
                maxW={'3xs'}
                color={useColorModeValue('black', 'white')}>
                {router.locales.map((locale) => {
                    const localeName = localesInfos[locale];
                    return (
                        <LinkBox
                            key={locale}
                            paddingX="4"
                            paddingY="2"
                            d="flex"
                            _hover={{
                                backgroundColor: 'gray.100',
                                color: 'black'
                            }}>
                            {getFlagEmoji(locale === 'en' ? 'gb' : locale)}
                            &nbsp;
                            <NextLink href={'/'} passHref locale={locale}>
                                <LinkOverlay flexGrow={1} alt={`choose ${locale}`}>
                                    {localeName}
                                </LinkOverlay>
                            </NextLink>
                        </LinkBox>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default NavLocaleSelector;

NavLocaleSelector.propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string),
    compact: PropTypes.bool
};

NavLocaleSelector.defaultProps = {
    compact: true
};
