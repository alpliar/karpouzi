/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from '../../components/layout';
import Link from '../../components/link';
import { Button, Box, Heading, Input, Container, useToast } from '@chakra-ui/react';

const LoginPage = () => {
    const toast = useToast();
    const handleSubmit = (event) => {
        event.preventDefault();
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true
        });
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
                                <Input
                                    label="Email address"
                                    name="email"
                                    defaultValue=""
                                    type="email"
                                />
                            </div>
                            <div>
                                <Input
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
                                <Link href="/lost-password" alt="go to lost password page">
                                    Forgot your password?
                                </Link>
                            </Container>
                        </div>

                        <div>
                            <Button type="submit" onClick={handleSubmit}>
                                Sign in
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </Layout>
    );
};

export default LoginPage;
