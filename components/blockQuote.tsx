import { Avatar } from '@chakra-ui/avatar';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, Stack, Text, Wrap } from '@chakra-ui/layout';

interface IBlockQuoteProps {
    author?: string;
    children;
}

const BlockQuote = ({ children, author }: IBlockQuoteProps) => {
    const { colorMode } = useColorMode();

    return (
        <Stack as="figure">
            {/* <Date dateString={postData.date} />· 6min read */}
            <Text as="blockquote">
                <Text
                    maxW="60ch"
                    fontSize="sm"
                    as="p"
                    p={2}
                    border={`1px solid ${useColorModeValue(
                        'rgba(0,0,0,0.1)',
                        'rgba(255,255,255,0.1)'
                    )}`}
                    backgroundColor={colorMode === 'light' ? 'whiteAlpha.200' : 'blackAlpha.200'}
                    rounded="md"
                    _before={{ content: '"«"', marginRight: '1ch' }}
                    _after={{ content: '"»"', marginLeft: '1ch' }}>
                    {children}
                </Text>
            </Text>
            {author && (
                <Wrap alignSelf="flex-end" as="figcaption">
                    <Text>— </Text>
                    <Avatar
                        src={'/icon-48x48.png'}
                        name="Karpouzi avatar"
                        bg="green.500"
                        size="xs"
                    />
                    <Heading size="xs">{author}</Heading>
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
