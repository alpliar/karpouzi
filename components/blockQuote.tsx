import { Avatar } from '@chakra-ui/avatar';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useBoolean } from '@chakra-ui/hooks';
import { Heading, HStack, Stack, Text, Wrap } from '@chakra-ui/layout';

interface IBlockQuoteProps {
    author?: string;
    noOfLines?: number;
    children;
}

const BlockQuote = ({ children, author, noOfLines = null }: IBlockQuoteProps) => {
    const { colorMode } = useColorMode();
    const [isOpen, setIsOpen] = useBoolean(false);

    const handleClick = () => {
        setIsOpen.toggle();
    };
    return (
        <Stack as="figure" spacing={1}>
            {/* <Date dateString={postData.date} />· 6min read */}
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
                    noOfLines={!isOpen ? noOfLines : null}
                    _before={{ content: '"«"', marginRight: '1ch' }}
                    _after={{ content: '"»"', marginLeft: '1ch' }}>
                    {children}
                </Text>
            </Text>
            {author && (
                <Wrap alignSelf="flex-end" align="center" as="figcaption">
                    <Text>— </Text>
                    <HStack spacing={1}>
                        <Avatar
                            src={'/icon-48x48.png'}
                            name="Karpouzi avatar"
                            bg="green.500"
                            size="2xs"
                        />
                        <Heading size="xs">{author}</Heading>
                    </HStack>
                    {/* <Text>,</Text> */}
                    {/* <cite>Karpouzi</cite> */}
                </Wrap>
            )}
        </Stack>
    );
};

export default BlockQuote;

BlockQuote.defaultProps = {
    author: 'Karpouzi'
};
