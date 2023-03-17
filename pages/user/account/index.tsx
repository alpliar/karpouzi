import { Avatar } from '@chakra-ui/avatar';
import { Checkbox } from '@chakra-ui/checkbox';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Stack, Text, Wrap } from '@chakra-ui/layout';
import { Button, ThemingProps } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { Textarea } from '@chakra-ui/textarea';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import AuthGard from '../../../components/AuthGard';
import Section, { SectionProps } from '../../../components/layout/Section';
import PageListingLayout from '../../../components/PageListingLayout';
import { sendToast } from '../../../utils/uiToast';

interface UserAccountPageProps {
    session: Session | null;
}

export const getServerSideProps: GetServerSideProps<UserAccountPageProps> = async (context) => {
    const session: Session | null = await getSession(context);

    return {
        props: {
            session
        }
    };
};

interface IUserAccountSectionProps {
    title: string;
    colorScheme?: ThemingProps['colorScheme'];
    pattern?: SectionProps['pattern'];
}
const UserAccountSection: React.FC<PropsWithChildren<IUserAccountSectionProps>> = ({
    title,
    children,
    colorScheme = 'white',
    pattern
}) => {
    return (
        <>
            <Section
                centerItems
                sectionPattern={pattern}
                colorScheme={colorScheme}
                title={title}
                paddingY={{ base: 8, md: 16, xl: 20 }}
                component={<Box maxW="lg">{children}</Box>}
            />
        </>
    );
};

const HelperText: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <Text fontSize="sm" color="helperText">
            {children}
        </Text>
    );
};

const UserAccountPage: NextPage<UserAccountPageProps> = () => {
    const { formatMessage } = useIntl();
    const router = useRouter();

    const { data: session } = useSession();
    const { name, image, email } = session?.user || {};

    const changeLocale = (newLocale: string) => {
        if (newLocale !== router.locale) {
            sendToast(
                formatMessage({ id: 'updatingLocale' }),
                formatMessage({ id: 'newLocaleDetail' }, { name: newLocale }),
                'info'
            );
        }
        router.push(router.pathname, router.asPath, { locale: newLocale, scroll: false });
    };

    const localesInfos = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        el: 'Ελληνικά'
    };

    return (
        <PageListingLayout
            // colorScheme={'gray'}
            title={formatMessage({ id: 'title' })}
            breadcrumbs={[
                {
                    text: formatMessage({ id: 'home' }),
                    link: '/',
                    alt: formatMessage(
                        { id: 'goToPageName' },
                        { name: formatMessage({ id: 'home' }) }
                    ),
                    isCurrentPage: false
                },
                {
                    text: formatMessage({ id: 'menuEntryUser' }),
                    link: '/user/account',
                    alt: formatMessage(
                        { id: 'goToPageName' },
                        { name: formatMessage({ id: 'menuEntryUser' }) }
                    ),
                    isCurrentPage: true
                }
            ]}
            fullWidth>
            <AuthGard>
                <>
                    <Stack spacing={0} p={0}>
                        <UserAccountSection
                            title={formatMessage({ id: 'personalInformations' })}
                            pattern="architect">
                            <FormControl id="name">
                                <FormLabel>{formatMessage({ id: 'name' })}</FormLabel>
                                <Input variant="filled" type="text" defaultValue={name || ''} />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>{formatMessage({ id: 'email' })}</FormLabel>
                                <Input variant="filled" type="email" defaultValue={email || ''} />
                                <FormHelperText>
                                    {formatMessage({ id: 'emailHelperText' })}
                                </FormHelperText>
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>{formatMessage({ id: 'bio' })}</FormLabel>
                                <Textarea variant="filled" colorScheme="green" />
                                <FormHelperText>
                                    {formatMessage({ id: 'bioHelperText' })}.
                                </FormHelperText>
                            </FormControl>
                        </UserAccountSection>

                        <UserAccountSection
                            title={formatMessage({ id: 'profilePhoto' })}
                            colorScheme="gray"
                            pattern="bankNote">
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align="center"
                                spacing={4}>
                                <Avatar src={image || ''} size="xl" name={name || 'unkown'} />
                                <Stack direction="column">
                                    <Wrap>
                                        <Button colorScheme="green">
                                            {formatMessage({ id: 'changePhoto' })}
                                        </Button>
                                        <Button variant="ghost" colorScheme="red">
                                            {formatMessage({ id: 'deletePhoto' })}
                                        </Button>
                                    </Wrap>
                                    <HelperText>
                                        {formatMessage({ id: 'photoHelperText' })}
                                    </HelperText>
                                </Stack>
                            </Stack>
                        </UserAccountSection>

                        <UserAccountSection
                            title={formatMessage({ id: 'language' })}
                            pattern="architect">
                            <Stack spacing={4}>
                                <FormControl id="country">
                                    <FormLabel>
                                        {formatMessage({ id: 'displayLanguage' })}
                                    </FormLabel>
                                    <Select
                                        placeholder={formatMessage({
                                            id: 'displayLanguagePlaceholder'
                                        })}
                                        defaultValue={router.locale}
                                        onChange={(event) => changeLocale(event.target.value)}>
                                        {router.locales?.map((locale) => {
                                            const localeName =
                                                localesInfos[locale as keyof typeof localesInfos];
                                            return (
                                                <option key={locale} value={locale}>
                                                    {localeName}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl id="country">
                                    <FormLabel>
                                        {formatMessage({ id: 'displayCurrency' })}
                                    </FormLabel>
                                    <Select
                                        placeholder={formatMessage({
                                            id: 'displayCurrencyPlaceholder'
                                        })}
                                        defaultValue="EUR">
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </Select>
                                    <HelperText>
                                        {formatMessage({ id: 'displayCurrencyHelperText' })}
                                    </HelperText>
                                </FormControl>
                            </Stack>
                        </UserAccountSection>

                        <UserAccountSection title={formatMessage({ id: 'notifications' })}>
                            <FormControl id="country">
                                <Stack spacing={4}>
                                    <Checkbox>
                                        {formatMessage({ id: 'getUpdatesAboutLatestMeetups' })}
                                    </Checkbox>
                                    <Checkbox defaultChecked>
                                        {formatMessage({
                                            id: 'getNotificationsAboutAccountActivities'
                                        })}
                                    </Checkbox>
                                </Stack>
                            </FormControl>
                        </UserAccountSection>

                        <Section
                            title=""
                            colorScheme="white"
                            paddingY={{ base: 8, sm: 16, md: 20 }}
                            component={
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    spacing={2}
                                    justify={{ base: 'center', sm: 'start' }}>
                                    <Button colorScheme="green">
                                        {formatMessage({ id: 'saveChanges' })}
                                    </Button>
                                    <Button>{formatMessage({ id: 'cancel' })}</Button>
                                </Stack>
                            }></Section>
                    </Stack>
                </>
            </AuthGard>
        </PageListingLayout>
    );
};

export default UserAccountPage;
