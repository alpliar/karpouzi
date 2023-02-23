import { Avatar } from '@chakra-ui/avatar';
import { Checkbox } from '@chakra-ui/checkbox';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Stack, Text, Wrap } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { Textarea } from '@chakra-ui/textarea';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import AuthGard from '../../../components/AuthGard';
import Section from '../../../components/layout/Section';
import PageListingLayout from '../../../components/pageListingLayout';
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
}
const UserAccountSection: React.FC<PropsWithChildren<IUserAccountSectionProps>> = ({
    title,
    children
}) => {
    return (
        <>
            <Section
                colorScheme={'white'}
                section={{
                    title,
                    component: <Box maxW="lg">{children}</Box>
                }}
            />
            {/* <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
            <Heading as="h2" fontSize="lg" minWidth={{ md: '3xs' }}>
                {title}
            </Heading>
            <Stack spacing={4}>{children}</Stack>
        </Stack> */}
        </>
    );
};

const HelperText: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <Text fontSize="sm" color={useColorModeValue('gray.500', 'whiteAlpha.600')}>
            {children}
        </Text>
    );
};

const UserAccountPage: NextPage<UserAccountPageProps> = () => {
    const { formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);
    const router = useRouter();

    const { data: session } = useSession();
    const { name, image, email } = session?.user || {};

    const changeLocale = (newLocale: string) => {
        if (newLocale !== router.locale) {
            sendToast(f('updatingLocale'), f('newLocaleDetail', { name: newLocale }), 'info');
        }
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    const localesInfos = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        el: 'Ελληνικά'
    };

    // if (status !== 'authenticated') {
    //     return (
    //         <AuthGard>
    //             <>tralala</>
    //         </AuthGard>
    //     );
    // }

    return (
        <PageListingLayout
            title={f('title')}
            breadcrumbs={[
                {
                    text: f('home'),
                    link: '/',
                    alt: f('goToPageName', { name: f('home') }),
                    isCurrentPage: false
                },
                {
                    text: f('menuEntryUser'),
                    link: '/user/account',
                    alt: f('goToPageName', { name: f('menuEntryUser') }),
                    isCurrentPage: true
                }
            ]}
            fullWidth>
            <AuthGard>
                <>
                    <Stack spacing={0} p={0}>
                        <UserAccountSection title={f('personalInformations')}>
                            <FormControl id="name">
                                <FormLabel>{f('name')}</FormLabel>
                                <Input variant="filled" type="text" defaultValue={name || ''} />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>{f('email')}</FormLabel>
                                <Input variant="filled" type="email" defaultValue={email || ''} />
                                <FormHelperText>{f('emailHelperText')}</FormHelperText>
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>{f('bio')}</FormLabel>
                                <Textarea variant="filled" colorScheme="green" />
                                <FormHelperText>{f('bioHelperText')}.</FormHelperText>
                            </FormControl>
                        </UserAccountSection>

                        <UserAccountSection title={f('profilePhoto')}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align="center"
                                spacing={4}>
                                <Avatar src={image || ''} size="xl" name="toto" />
                                <Stack direction="column">
                                    <Wrap>
                                        <Button colorScheme="green">{f('changePhoto')}</Button>
                                        <Button variant="ghost" colorScheme="red">
                                            {f('deletePhoto')}
                                        </Button>
                                    </Wrap>
                                    <HelperText>{f('photoHelperText')}</HelperText>
                                </Stack>
                            </Stack>
                        </UserAccountSection>

                        <UserAccountSection title={f('language')}>
                            <Stack spacing={4}>
                                <FormControl id="country">
                                    <FormLabel>{f('displayLanguage')}</FormLabel>
                                    <Select
                                        placeholder={f('displayLanguagePlaceholder')}
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
                                    <FormLabel>{f('displayCurrency')}</FormLabel>
                                    <Select
                                        placeholder={f('displayCurrencyPlaceholder')}
                                        defaultValue="EUR">
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </Select>
                                    <HelperText>{f('displayCurrencyHelperText')}</HelperText>
                                </FormControl>
                            </Stack>
                        </UserAccountSection>

                        <UserAccountSection title={f('notifications')}>
                            <FormControl id="country">
                                <Stack spacing={4}>
                                    <Checkbox>{f('getUpdatesAboutLatestMeetups')}</Checkbox>
                                    <Checkbox defaultChecked>
                                        {f('getNotificationsAboutAccountActivities')}
                                    </Checkbox>
                                </Stack>
                            </FormControl>
                        </UserAccountSection>

                        <UserAccountSection title={f('connectAccounts')}>
                            <Wrap>
                                <Button leftIcon={<Icon as={FaGithub} />}>
                                    {f('connectGithub')}
                                </Button>
                                <Button leftIcon={<Icon as={FaGoogle} />}>
                                    {f('connectGoogle')}
                                </Button>
                            </Wrap>
                        </UserAccountSection>

                        <Box>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                marginTop={16}
                                spacing={2}
                                justify="center">
                                <Button colorScheme="green">{f('saveChanges')}</Button>
                                <Button>{f('cancel')}</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </>
            </AuthGard>
        </PageListingLayout>
    );
};

export default UserAccountPage;
