import { Box, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaGlobeAmericas as LocaleIcon } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import getFlagEmoji from '../utils/flags';
import { sendToast } from '../utils/uiToast';
import Link from './link';
import NavButton from './navButton';
import Popover from './Popover';

export interface INavLocaleSelectorProps {
    compact?: boolean;
}

const NavLocaleSelector: React.FC<INavLocaleSelectorProps> = ({ compact = false }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const router = useRouter();

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

    const handleClick = (locale: string) => {
        if (locale !== router.locale)
            sendToast(f('updatingLocale'), f('newLocaleDetail', { name: locale }), 'info');
    };

    return (
        <Box>
            <Popover
                trigger={
                    <Box>
                        <NavButton
                            e2e="localeCTA"
                            label={f('language')}
                            compact={compact}
                            icon={LocaleIcon}
                            // icon={IoLanguage}
                            handleClick={() => {
                                //TODO: do nothing, really ?
                            }}
                        />
                    </Box>
                }
                header={
                    <Heading as="p" fontSize="lg" textAlign="center">
                        <Text as="span" display="flex" alignItems="center">
                            {`${f('language')} / `}
                            <Icon as={IoLanguage} boxSize={7} ml={1} />
                        </Text>
                        {/* <Icon as={FaLanguage} boxSize={8} ml={2} /> */}
                    </Heading>
                }>
                <Stack spacing={2}>
                    {router.locales?.map((locale: string) => {
                        const localeName = localesInfos[locale as keyof typeof localesInfos];
                        const isCurrentLocale = locale === router.locale;
                        return (
                            <Link
                                asButton
                                onClick={() => handleClick(locale)}
                                key={locale}
                                href={router.asPath}
                                locale={locale}
                                fontWeight={isCurrentLocale ? 'bold' : 'normal'}>
                                <Text fontSize="sm" as="span">
                                    {getFlagEmoji(countryCode(locale))}
                                </Text>
                                <Text as="span">&nbsp;{localeName}</Text>
                            </Link>
                        );
                    })}
                </Stack>
            </Popover>
        </Box>
    );
};

export default NavLocaleSelector;
