import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { LinkBox, LinkOverlay, Stack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaFlag } from 'react-icons/fa';
import getFlagEmoji from '../utils/flags';
import Link from './link';

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
                e2e="localeToggle"
                size={size}
                color="white"
                colorScheme={colorScheme}
                as={compact === true ? IconButton : Button}
                icon={compact === true && <FaFlag />}>
                {compact === false && 'Language'}
            </MenuButton>
            <MenuList paddingX="2" e2e="localeMenu" color={useColorModeValue('black', 'white')}>
                {router.locales.map((locale) => {
                    const localeName = localesInfos[locale];
                    return (
                        <LinkBox as={MenuItem} cursor="pointer" key={locale}>
                            <LinkOverlay
                                as={Link}
                                w="full"
                                d="block"
                                href={`/${locale !== 'en' ? locale : ''}`}
                                alt={`choose ${locale}`}>
                                {getFlagEmoji(locale === 'en' ? 'gb' : locale)}
                                {localeName}
                            </LinkOverlay>
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
