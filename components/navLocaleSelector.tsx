import { Box, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaGlobeAmericas as LocaleIcon } from 'react-icons/fa';
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
                            handleClick={() => {
                                // test
                            }}
                        />
                    </Box>
                }>
                <Stack>
                    {router.locales?.map((locale: string) => {
                        const localeName = localesInfos[locale as keyof typeof localesInfos];
                        const isCurrentLocale = locale === router.locale;
                        return (
                            <Link
                                onClick={() => handleClick(locale)}
                                key={locale}
                                href={router.asPath}
                                locale={locale}
                                fontWeight={isCurrentLocale ? 'bold' : 'normal'}>
                                {getFlagEmoji(countryCode(locale))}
                                &nbsp;{localeName}
                            </Link>
                        );
                    })}
                </Stack>
            </Popover>
        </Box>
    );
};

export default NavLocaleSelector;
