import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Divider, Heading, Stack, Wrap, Text, WrapItem, Box } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Select } from '@chakra-ui/select';
import { Textarea } from '@chakra-ui/textarea';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import PageListingLayout from '../../../components/pageListingLayout';

interface UserAccountSectionProps {
    title: string;
    children?;
}
const UserAccountSection = ({ title, children }: UserAccountSectionProps) => {
    return (
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
            <Heading as="h2" fontSize="lg" minWidth={{ md: '3xs' }}>
                {title}
            </Heading>
            <Stack spacing={4}>{children}</Stack>
        </Stack>
    );
};

const HelperText = ({ children }: any) => {
    return (
        <Text fontSize="sm" color={useColorModeValue('gray.500', 'whiteAlpha.600')}>
            {children}
        </Text>
    );
};

const Page: NextPage = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const router = useRouter();

    const changeLocale = (newLocale) => {
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    const localesInfos = {
        en: 'English',
        fr: 'Français',
        es: 'Español',
        gr: 'Ελληνικά'
    };

    const isFullWidthFormButtons: boolean = useBreakpointValue({ base: true, sm: false });

    return (
        <PageListingLayout
            title={f('title')}
            breadcrumbs={[
                {
                    text: 'Home',
                    link: '/',
                    alt: 'go to home page',
                    isCurrentPage: false
                },
                {
                    text: 'User',
                    link: '/user',
                    alt: 'go to user home'
                },
                {
                    text: 'Account settings',
                    isCurrentPage: true
                }
            ]}>
            <Stack spacing={4}>
                <UserAccountSection title={f('personalInformations')}>
                    <FormControl id="name">
                        <FormLabel>{f('name')}</FormLabel>
                        <Input type="text" />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>{f('email')}</FormLabel>
                        <Input type="email" />
                        <FormHelperText>{f('emailHelperText')}</FormHelperText>
                    </FormControl>
                    <FormControl id="bio">
                        <FormLabel>{f('bio')}</FormLabel>
                        <Textarea />
                        <FormHelperText>{f('bioHelperText')}.</FormHelperText>
                    </FormControl>
                </UserAccountSection>

                <Divider />

                <UserAccountSection title={f('profilePhoto')}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align="center" spacing={4}>
                        <Avatar size="xl" name="toto" />
                        <Stack direction="column">
                            <Wrap>
                                <Button>{f('changePhoto')}</Button>
                                <Button variant="ghost" colorScheme="red">
                                    {f('deletePhoto')}
                                </Button>
                            </Wrap>
                            <HelperText>{f('photoHelperText')}</HelperText>
                        </Stack>
                    </Stack>
                </UserAccountSection>

                <Divider />

                <UserAccountSection title={f('language')}>
                    <Stack spacing={4}>
                        <FormControl id="country">
                            <FormLabel>{f('displayLanguage')}</FormLabel>
                            <Select
                                placeholder={f('displayLanguagePlaceholder')}
                                defaultValue={router.locale}
                                onChange={(event) => changeLocale(event.target.value)}>
                                {router.locales.map((locale) => {
                                    const localeName = localesInfos[locale];
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

                <Divider />

                <UserAccountSection title={f('notifications')}>
                    <FormControl id="country">
                        <Stack spacing={4}>
                            <Checkbox>{f('getUpdatesAboutLatestMeetups')}</Checkbox>
                            <Checkbox defaultIsChecked>
                                {f('getNotificationsAboutAccountActivities')}
                            </Checkbox>
                        </Stack>
                    </FormControl>
                </UserAccountSection>

                <Divider />

                <UserAccountSection title={f('connectAccounts')}>
                    <Wrap>
                        <Button leftIcon={<Icon as={FaGithub} />}>{f('connectGithub')}</Button>
                        <Button leftIcon={<Icon as={FaGoogle} />}>{f('connectGoogle')}</Button>
                    </Wrap>
                </UserAccountSection>

                <Box>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        marginTop={16}
                        spacing={2}
                        justify="center">
                        <Button isFullWidth={isFullWidthFormButtons} colorScheme="green">
                            {f('saveChanges')}
                        </Button>
                        <Button isFullWidth={isFullWidthFormButtons}>{f('cancel')}</Button>
                    </Stack>
                </Box>
            </Stack>
        </PageListingLayout>
    );
};

export default Page;
