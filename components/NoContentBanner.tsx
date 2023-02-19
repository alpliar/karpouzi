import { Center, Flex, Stack, Text, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Link as ILink } from '../models/link.model';
import Banner from './banner';
import Link from './link';

type Props = {
    children?: React.ReactElement;
    text: string;
    helperText: string;
    links?: ILink[];
};

const NoContentBanner: React.FC<Props> = ({ text, helperText, links, children }) => {
    const noProductBackground = useColorModeValue('orange.300', 'orange.800');
    return (
        <Banner pattern="wiggle" bgColor={noProductBackground} height="inherit" padding={16}>
            <Center fontFamily="heading" fontSize={{ base: '2xl', lg: '4xl' }}>
                <Stack spacing={8}>
                    <Text maxW="20ch">{text}</Text>
                    {children && <Flex justify="center">{children}</Flex>}
                    <Stack spacing={4} maxW="20ch">
                        <Text fontSize={{ base: 'lg' }}>{helperText}</Text>

                        <Wrap justify="center">
                            {links?.map(({ href, text }) => (
                                <WrapItem key={href}>
                                    <Link
                                        asButton
                                        // maxW={4}
                                        href={href}
                                        buttonProps={{
                                            variant: 'solid',
                                            colorScheme: 'orange',
                                            size: 'sm'
                                        }}>
                                        {text}
                                    </Link>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Stack>
                </Stack>
            </Center>
        </Banner>
    );
};

export default NoContentBanner;
