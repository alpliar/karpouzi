import { CheckIcon } from '@chakra-ui/icons';
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Input } from '@chakra-ui/input';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const CallToActionNewsletter = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    const [email, setEmail] = useState('');
    const [state, setState] = useState('initial');
    const [error, setError] = useState(false);

    const feedbackTextColor = useColorModeValue('gray.800', 'gray.300');

    return (
        <Flex align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Container
                maxW="lg"
                bg={useColorModeValue('white', 'whiteAlpha.100')}
                boxShadow="xl"
                rounded="lg"
                p={6}>
                <Heading as="h2" fontSize={{ base: 'xl', sm: '2xl' }} textAlign="center" mb={5}>
                    {f('newsletterSubscribe')}
                </Heading>
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
                            color="gray.800"
                            _placeholder={{
                                color: 'gray.400'
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
                            colorScheme={state === 'success' ? 'green' : 'blue'}
                            isLoading={state === 'submitting'}
                            w="100%"
                            type={state === 'success' ? 'button' : 'submit'}
                            disabled={state === 'success'}>
                            {state === 'success' ? <CheckIcon /> : f('submit')}
                        </Button>
                    </FormControl>
                </Stack>
                <Text mt={2} textAlign="center" color={error ? 'red.500' : feedbackTextColor}>
                    {error
                        ? f('newsletterError')
                        : state === 'submitting'
                        ? f('newsletterSubscribing')
                        : f('newsletterSubscribed')}
                </Text>
            </Container>
        </Flex>
    );
};

export default CallToActionNewsletter;
