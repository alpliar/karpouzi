import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Box, Container, Divider, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/layout';
import { NextPage } from 'next';
import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import Card from '../../../components/card';
import Link from '../../../components/link';
import PageListingLayout from '../../../components/pageListingLayout';
import { sendToast } from '../../../utils/uiToast';

const LoginPage: NextPage = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        sendToast('Account created.', "We've created your account for you.", 'success', 5000);
    };

    return (
        <PageListingLayout
            title={f('signInLong')}
            breadcrumbs={[]}
            introSlot={
                <Alert status="info">
                    <AlertIcon />
                    <Text>
                        {f('or')}
                        {` `}
                        {f('startFreeTrial')}
                    </Text>
                </Alert>
            }>
            <Container maxW="sm">
                <Card>
                    <Stack spacing={4}>
                        <form action="#" method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>{f('emailAddress')}</FormLabel>
                                    <Input type="email" />
                                    <FormHelperText>{f('emailReassurance')}</FormHelperText>
                                </FormControl>
                                <FormControl id="email">
                                    <SimpleGrid
                                        columns={{ base: 1, sm: 2 }}
                                        alignItems="baseline"
                                        justifyContent="baseline">
                                        <FormLabel>{f('password')}</FormLabel>
                                        <Link href="/lost-password" alt="go to lost password page">
                                            <Text as="em" fontSize="smaller">
                                                {f('lostPassword')}
                                            </Text>
                                        </Link>
                                    </SimpleGrid>
                                    <Input type="password" />
                                    <FormHelperText>{f('passwordReassurance')}</FormHelperText>
                                </FormControl>

                                <Flex
                                    direction={{ base: 'column', sm: 'row' }}
                                    justifyContent="space-between">
                                    <Box className="flex items-center">
                                        <Checkbox
                                            colorScheme="green"
                                            id="remember_me"
                                            name="remember_me"
                                            type="checkbox"
                                            className="h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded">
                                            {f('rememberMe')}
                                        </Checkbox>
                                    </Box>
                                </Flex>

                                <Button
                                    isFullWidth
                                    colorScheme="green"
                                    type="submit"
                                    onClick={handleSubmit}>
                                    {f('signIn')}
                                </Button>
                            </Stack>
                        </form>
                        <Divider />
                        <Text textAlign="center">Or continue with</Text>
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
                            <Button leftIcon={<Icon as={FaGithub} />}> Github</Button>
                            <Button leftIcon={<Icon as={FaGoogle} />}> Google</Button>
                            <Button leftIcon={<Icon as={FaFacebook} />}> Facebook</Button>
                        </SimpleGrid>
                    </Stack>
                </Card>
            </Container>
        </PageListingLayout>
    );
};

export default LoginPage;
