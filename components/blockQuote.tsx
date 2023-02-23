import { Avatar } from '@chakra-ui/avatar';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useBoolean } from '@chakra-ui/hooks';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { ChakraProps } from '@chakra-ui/system';
import { PropsWithChildren } from 'react';

interface IBlockQuoteProps {
    author?: string;
    noOfLines?: ChakraProps['noOfLines'];
}

const BlockQuote: React.FC<PropsWithChildren<IBlockQuoteProps>> = ({
    children,
    author,
    noOfLines = undefined
}) => {
    const { colorMode } = useColorMode();
    const [isOpen, setIsOpen] = useBoolean(false);

    const handleClick = () => {
        setIsOpen.toggle();
    };
    return (
        <Stack as="figure" spacing={1} w="full">
            <Text
                as="blockquote"
                p={2}
                border={`1px solid ${useColorModeValue(
                    'rgba(0,0,0,0.1)',
                    'rgba(255,255,255,0.1)'
                )}`}
                backgroundColor={colorMode === 'light' ? 'whiteAlpha.200' : 'blackAlpha.200'}
                rounded="md">
                <Text
                    as="p"
                    fontSize="sm"
                    onClick={handleClick}
                    maxW="60ch"
                    noOfLines={!isOpen ? noOfLines : undefined}
                    _before={{ content: '"«"', marginRight: '1ch' }}
                    _after={{ content: '"»"', marginLeft: '1ch' }}>
                    {children}
                </Text>
            </Text>
            {author && (
                <Flex wrap="wrap" gap={1} alignSelf="flex-end" align="center" as="figcaption">
                    <Text>— </Text>
                    <Flex wrap="wrap" gap={1}>
                        <Avatar
                            src={'/icon-48x48.png'}
                            name="Karpouzi avatar"
                            bg="green.500"
                            size="2xs"
                        />
                        <Heading overflowWrap="anywhere" size="xs">
                            {author}
                        </Heading>
                    </Flex>
                </Flex>
            )}
        </Stack>
    );
};

export default BlockQuote;

BlockQuote.defaultProps = {
    author: 'Karpouzi'
};
