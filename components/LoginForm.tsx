import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FaDiscord, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { sendToast } from '../utils/uiToast';
import FormContainer from './FormContainer';
import Link from './link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        sendToast('Account created.', "We've created your account for you.", 'success', 5000);
    };

    const handleClickOnProvider = (provider: 'discord') => {
        signIn(provider, {
            callbackUrl: '/user/account'
        });
        // .then(() => {
        //     sendToast(f('loggedOutSuccessfully'), '', 'info', 5000, 'top-right');
        // });
    };

    return (
        <FormContainer>
            <>
                <form action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
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

                        <Button colorScheme="green" type="submit" onClick={handleSubmit}>
                            {f('signIn')}
                        </Button>
                    </Stack>
                </form>
                <Stack spacing={4}>
                    <Divider />
                    <Text textAlign="center">{f('orContinueWith')}</Text>

                    <Stack spacing={2}>
                        <noscript>
                            <Alert status="warning" fontSize="md">
                                <AlertIcon />
                                {f('javaScriptRequiredForSocialLogin')}
                            </Alert>
                        </noscript>
                        <Button
                            onClick={() => handleClickOnProvider('discord')}
                            leftIcon={<Icon as={FaDiscord} />}>
                            Discord
                        </Button>
                        <Button
                            disabled
                            // onClick={() => handleClickOnProvider('google')}
                            leftIcon={<Icon as={FaGoogle} />}>
                            Google
                        </Button>
                        <Button
                            disabled
                            // onClick={() => handleClickOnProvider('facebook')}
                            leftIcon={<Icon as={FaFacebook} />}>
                            Facebook
                        </Button>
                    </Stack>
                </Stack>
            </>
        </FormContainer>
    );
};

export default LoginForm;
