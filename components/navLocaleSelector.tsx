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
        gr: 'Ελληνικά'
    };

    const menuBgColor = useColorModeValue('white', 'gray.800');
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'sm';
    // const itemHoverColor = useColorModeValue('gray.800', 'white');
    const itemHoverBgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

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
                    return (
                        <MenuItem key={locale}>
                            <LinkBox
                            // paddingX="4"
                            // paddingY="2"
                            // display="flex"
                            // _hover={{
                            //     backgroundColor: itemHoverBgColor
                            //     // color: itemHoverColor
                            // }}
                            >
                                <NextLink href={router.pathname} passHref locale={locale}>
                                    <LinkOverlay flexGrow={1} title={`choose ${locale}`}>
                                        {getFlagEmoji(locale === 'en' ? 'gb' : locale)}
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
