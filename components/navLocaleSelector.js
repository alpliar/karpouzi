import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaFlag } from 'react-icons/fa';

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

    return (
        <Menu>
            <MenuButton
                color="white"
                colorScheme={colorScheme}
                as={compact === true ? IconButton : Button}
                icon={compact === true && <FaFlag />}>
                {compact === false && 'Language'}
            </MenuButton>
            <MenuList color={useColorModeValue('black', 'white')}>
                {router.locales.map((locale) => {
                    const localeName = localesInfos[locale];
                    return (
                        <MenuItem
                            cursor="pointer"
                            onClick={() => {
                                handleSelection(locale);
                            }}
                            key={locale}>
                            <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src={`https://www.countryflags.io/${
                                    locale == 'en' ? 'gb' : locale
                                }/flat/64.png`}
                                alt={locale}
                                mr="12px"
                            />
                            {localeName}
                        </MenuItem>
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
