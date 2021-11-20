import { Avatar } from '@chakra-ui/avatar';
import { useColorMode } from '@chakra-ui/color-mode';
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
            <blockquote>
                <Text
                    maxW="60ch"
                    fontSize="sm"
                    as="p"
                    p={2}
                    backgroundColor={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.300'}
                    rounded="md"
                    _before={{ content: '"«"', marginRight: '1ch' }}
                    _after={{ content: '"»"', marginLeft: '1ch' }}>
                    {children}
                </Text>
            </blockquote>
            {author && (
                <Wrap alignSelf="flex-end" as="figcaption">
                    <Text>— </Text>
                    <Avatar src={'/icon-48x48.png'} alt="Author" bg="green.500" size="xs" />
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
