/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from '../../components/layout';
import Link from 'next/link';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';

const LoginPage = () => {
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
                        <span>Sign in to your account</span>
                    </Heading>
                    <p className="mt-2 text-center text-sm">
                        Or{' '}
                        <a href="#" className="font-medium">
                            start your 14-day free trial
                        </a>
                    </p>

                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Input placeholder="Email address" />
                                {/* <Field
                                    label="Email address"
                                    name="email"
                                    defaultValue=""
                                    type="email"
                                /> */}
                            </div>
                            <div>
                                <Input placeholder="Password" />
                                {/* <Field
                                    label="Password"
                                    name="password"
                                    defaultValue=""
                                    type="password"
                                /> */}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm">
                                    Remember me
                                </label>
                            </div>

                            <Container p={4} bg="muted">
                                <Link href="/lost-password">
                                    <a className="font-medium">Forgot your password?</a>
                                </Link>
                            </Container>
                        </div>

                        <div>
                            <Button type="submit">Sign in</Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </Layout>
    );
};

export default LoginPage;
