/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Link from '../../components/link';
import Layout from '../../components/pageLayout';
import { sendToast } from '../../utils/uiToast';

const LoginPage: NextPage = () => {

    const { formatMessage } = useIntl();
    const f = (id : string) => formatMessage({ id });

    const handleSubmit = (event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        sendToast('Account created.', "We've created your account for you.", 'success', 5000);
    };

    return (
        <Layout>
            <Container
                p={4}
                sx={{
                    textAlign: 'center',
                    maxWidth: '640px'
                }}>
                <Box>
                    <Heading as="h2" className="text-center">
                        <span>{f('signInLong')}</span>
                    </Heading>
                    <Text mt={4} className="mt-2 text-center text-sm">
                    {f('or')}{' '}
                        <a href="#" className="font-medium">
                        {f('startFreeTrial')}
                        </a>
                    </Text>

                    <form action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <Stack spacing={2} my={8}>
                            <FormControl id="email">
                                <FormLabel>{f('emailAddress')}</FormLabel>
                                <Input type="email" />
                                <FormHelperText>{f('emailReassurance')}</FormHelperText>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>{f('password')}</FormLabel>
                                <Input type="password" />
                                <FormHelperText>{f('passwordReassurance')}</FormHelperText>
                            </FormControl>
                        </Stack>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm">
                                    {f('rememberMe')}
                                </label>
                            </div>

                            <Container p={4} bg="muted">
                                <Link href="/lost-password" alt="go to lost password page">
                                {f('lostPassword')}
                                </Link>
                            </Container>
                        </div>

                        <div>
                            <Button type="submit" onClick={handleSubmit}>
                                {f('signIn')}
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </Layout>
    );
};

export default LoginPage;
