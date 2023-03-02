import { Button } from '@chakra-ui/button';
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

    return (
        <Box>
            <Stack
                maxW={{ sm: 'sm' }}
                direction={{ base: 'column', md: 'row' }}
                as="form"
                spacing="12px"
                onSubmit={(e) => {
                    e.preventDefault();
                    setError(false);
                    setState('submitting');

                    // remove this code and implement your submit logic right here
                    setTimeout(() => {
                        if (email.includes('fail')) {
                            setError(true);
                            setState('initial');
                            return;
                        }

                        setState('success');
                    }, 1000);
                }}>
                <FormControl>
                    <Input
                        variant="outline"
                        _placeholder={{
                            color: 'currentColor'
                        }}
                        borderColor="currentcolor"
                        _hover={{
                            borderColor: `${colorScheme}.500`
                        }}
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
            {error && (
                <Text mt={2} color="error">
                    {f('newsletterError')}
                </Text>
            )}
            {state !== 'initial' && (
                <Text mt={2}>
                    {error && <>{f('newsletterError')}</>}
                    {state === 'submitting' && <>{f('newsletterSubscribing')}</>}
                    {state === 'success' && <>{f('newsletterSubscribed')}</>}
                </Text>
            )}
        </Box>
    );
};

export default CallToActionNewsletter;
