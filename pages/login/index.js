/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from '../../components/layout';
import Link from 'next/link';
import { Heading } from 'theme-ui';
import { Button, Container, Field } from 'theme-ui';

const LoginPage = () => {
    return (
        <Layout>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Container p={4} bg="muted">
                        <Heading as="h2" className="text-center">
                            <span>Sign in to your account</span>
                        </Heading>
                        <p className="mt-2 text-center text-sm">
                            Or{' '}
                            <a href="#" className="font-medium">
                                start your 14-day free trial
                            </a>
                        </p>
                    </Container>
                    <Container p={4} bg="muted">
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <Field
                                        label="Email address"
                                        name="email"
                                        defaultValue=""
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <Field
                                        label="Password"
                                        name="password"
                                        defaultValue=""
                                        type="password"
                                    />
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
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
