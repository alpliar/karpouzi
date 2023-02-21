import { Box, Divider, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaAsterisk, FaGlobeAmericas as LocaleIcon } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import i18nConfig from '../constants/i18n.config.json';
import getFlagEmoji from '../utils/flags';
import { sendToast } from '../utils/uiToast';
import Link from './link';
import NavButton from './navButton';
import Popover from './Popover';

const PartiallySupportedLocaleIcon = () => <Icon boxSize={2} as={FaAsterisk} />;

export interface INavLocaleSelectorProps {
    compact?: boolean;
}

interface LocaleGroupProps {
    locales: string[];
    // label: string;
    isFullySupported?: boolean;
}

const LocaleGroup: React.FC<LocaleGroupProps> = ({ locales, isFullySupported = false }) => {
    return (
        <Stack>
            {/* <Heading fontSize="sm" noOfLines={1} as="span">
                {label}
            </Heading> */}
            {locales.map((locale) => (
                <NavLocaleSelectorItem
                    key={locale}
                    locale={locale}
                    isFullySupported={isFullySupported}
                />
            ))}
        </Stack>
    );
};
interface NavLocaleSelectorItemProps {
    locale: string;
    isFullySupported: boolean;
}
const NavLocaleSelectorItem: React.FC<NavLocaleSelectorItemProps> = ({
    locale,
    isFullySupported
}) => {
    const router = useRouter();
    const { formatMessage } = useIntl();

    const { asPath: currentPath } = router;
    const isCurrentLocale = router.locale === locale;
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const handleClick = () => {
        if (locale !== router.locale)
            sendToast(f('updatingLocale'), f('newLocaleDetail', { name: locale }), 'info');
    };

    const localesNames = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        el: 'Ελληνικά'
    };
    const localeName = localesNames[locale as keyof typeof localesNames];

    const countryCode = (localeCode: string) => {
        if (localeCode === 'en') return 'gb';
        if (localeCode === 'el') return 'gr';
        return localeCode || 'en';
    };

    return (
        <Link
            asButton
            buttonProps={{
                rightIcon: !isFullySupported ? <Icon boxSize={2} as={FaAsterisk} /> : undefined,
                colorScheme: isCurrentLocale ? 'yellow' : undefined,
                // TODO: Flag should not be underlined on button hover
                leftIcon: (
                    <Text fontSize="sm" as="span" className="localeIcon">
                        {getFlagEmoji(countryCode(locale))}
                    </Text>
                )
            }}
            onClick={handleClick}
            key={locale}
            href={currentPath}
            locale={locale}
            fontWeight={isCurrentLocale ? 'bold' : 'normal'}>
            <Text as="span">{localeName}</Text>
        </Link>
    );
};

const NavLocaleSelector: React.FC<INavLocaleSelectorProps> = ({ compact = false }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const { supportedLocales, fullySupportedLocales } = i18nConfig;
    const partiallySupportedLocales = supportedLocales.filter(
        (locale) => !fullySupportedLocales.includes(locale)
    );

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
                                //TODO: do nothing, really ?
                            }}
                        />
                    </Box>
                }
                header={
                    <>
                        <Heading as="p" fontSize="lg">
                            {`${f('language')} / `}
                        </Heading>
                        <Icon as={IoLanguage} boxSize={7} ml={1} />
                    </>
                }
                footer={
                    <Text>
                        <PartiallySupportedLocaleIcon />
                        <Text fontSize="sm" ml={1} as="span" fontStyle="italic">
                            {f('partiallySupportedLocales')}
                        </Text>
                    </Text>
                }>
                <Stack spacing={2}>
                    <LocaleGroup
                        // label={f('fullySupportedLocales')}
                        locales={fullySupportedLocales}
                        isFullySupported
                    />
                    <Divider />
                    <LocaleGroup
                        // label={f('partiallySupportedLocales')}
                        locales={partiallySupportedLocales}
                    />
                </Stack>
            </Popover>
        </Box>
    );
};

export default NavLocaleSelector;
