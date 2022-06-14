import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { MenuItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FaFlag } from 'react-icons/fa';
import getFlagEmoji from '../utils/flags';
import { sendToast } from '../utils/uiToast';

export interface INavLocaleSelectorProps {
    compact?: boolean;
}

const NavLocaleSelector: React.FC<INavLocaleSelectorProps> = ({ compact = false }) => {
    const router = useRouter();
    // const handleSelection = (newLocale) => {
    //     router.push(router.pathname, router.asPath, { locale: newLocale });
    // };

    const localesInfos = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        el: 'Ελληνικά'
    };

    const countryCode = (localeCode: string) => {
        if (localeCode === 'en') return 'gb';
        if (localeCode === 'el') return 'gr';
        return localeCode || 'en';
    };

    const menuBgColor = useColorModeValue('white', 'gray.800');
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'sm';
    // const itemHoverColor = useColorModeValue('gray.800', 'white');
    // const itemHoverBgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

    const handleClick = (locale: string) => {
        if (locale !== router.locale)
            sendToast(
                'Locale changed',
                `Now viewing ${locale.toLocaleUpperCase()} version of Karpouzi`,
                'info'
            );
    };

    return (
        <Menu>
            <MenuButton
                data-e2e="localeCTA"
                aria-label="Toggle locale"
                size={size}
                variant="ghost"
                as={compact === true ? IconButton : Button}
                icon={compact === true && <FaFlag />}>
                {compact === false && 'Language'}
            </MenuButton>
            <MenuList padding="0" minW={'4xs'} maxW={'3xs'} bgColor={menuBgColor}>
                {router.locales?.map((locale: string) => {
                    const localeName = localesInfos[locale as keyof typeof localesInfos];
                    const isCurrentLocale = locale !== router.locale;
                    return (
                        <MenuItem key={locale} cursor={isCurrentLocale ? 'default' : 'pointer'}>
                            <LinkBox
                            // paddingX="4"
                            // paddingY="2"
                            // display="flex"
                            // _hover={{
                            //     backgroundColor: itemHoverBgColor
                            //     // color: itemHoverColor
                            // }}
                            >
                                <NextLink href={router.asPath} passHref locale={locale}>
                                    <LinkOverlay
                                        flexGrow={1}
                                        title={`choose ${locale}`}
                                        onClick={() => {
                                            handleClick(locale);
                                        }}>
                                        {getFlagEmoji(countryCode(locale))}
                                        &nbsp;
                                        {localeName}
                                    </LinkOverlay>
                                </NextLink>
                            </LinkBox>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default NavLocaleSelector;
