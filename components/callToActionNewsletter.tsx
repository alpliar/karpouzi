import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl } from '@chakra-ui/form-control';
import { CheckIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { ThemingProps } from '@chakra-ui/system';
import { useState } from 'react';
import { useIntl } from 'react-intl';

type Props = {
    colorScheme?: ThemingProps['colorScheme'];
};

const CallToActionNewsletter: React.FC<Props> = ({ colorScheme = 'green' }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    const [email, setEmail] = useState('');
    const [state, setState] = useState('initial');
    const [error, setError] = useState(false);

    const feedbackTextColor = useColorModeValue('gray.800', 'gray.300');

    return (
        <Box>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                as="form"
                spacing="12px"
                onSubmit={(e) => {
                    e.preventDefault();
                    setError(false);
                    setState('submitting');

                    // remove this code and implement your submit logic right here
                    setTimeout(() => {
                        if (email === 'fail@example.com') {
                            setError(true);
                            setState('initial');
                            return;
                        }

                        setState('success');
                    }, 1000);
                }}>
                <FormControl>
                    <Input
                        variant="solid"
                        borderWidth={1}
                        color="currentColor"
                        _placeholder={{
                            color: 'currentColor'
                        }}
                        borderColor={useColorModeValue('gray.300', 'gray.700')}
                        id="email"
                        type="email"
                        required
                        placeholder={f('newsletterYourEmail')}
                        aria-label={f('newsletterYourEmail')}
                        value={email}
                        disabled={state !== 'initial'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl w={{ base: '100%', md: '40%' }}>
                    <Button
                        colorScheme={colorScheme}
                        isLoading={state === 'submitting'}
                        w="100%"
                        type={state === 'success' ? 'button' : 'submit'}
                        disabled={state === 'success'}>
                        {state === 'success' ? <CheckIcon /> : f('submit')}
                    </Button>
                </FormControl>
            </Stack>
            {error ||
                (state !== 'initial' && (
                    <Text mt={2} color={error ? 'red.500' : feedbackTextColor}>
                        {error && <>{f('newsletterError')}</>}
                        {state === 'submitting' && <>{f('newsletterSubscribing')}</>}
                        {state === 'success' && <>{f('newsletterSubscribed')}</>}
                    </Text>
                ))}
        </Box>
    );
};

export default CallToActionNewsletter;
