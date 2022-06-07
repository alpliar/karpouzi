import {
    Avatar,
    Box,
    Heading,
    Img,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import Card from './card';

interface IBlogPostCardProps {
    title: string;
    date: string;
    slug: string;
    author?: string;
    authorAvatar?: string;
    timeToRead: number;
    image?: string;
}

const BlogPostCard: React.FC<IBlogPostCardProps> = ({
    title,
    date,
    slug,
    author = 'Karpouzi',
    authorAvatar = '/icon-48x48.png',
    timeToRead,
    image = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}) => {
    return (
        <LinkBox>
            <Card>
                <Box
                    minH={32}
                    maxH={64}
                    bg="gray.100"
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos="relative"
                    overflow="hidden">
                    <Img src={image} />
                </Box>
                <Stack>
                    <Text
                        color="green.500"
                        textTransform="uppercase"
                        fontWeight="bold"
                        fontSize="sm"
                        letterSpacing={1}>
                        Blog
                    </Text>
                    <Stack h={32}>
                        <Link
                            passHref
                            href={{
                                pathname: '/blog/post/[slug]',
                                query: { slug }
                            }}>
                            <LinkOverlay>
                                <Heading
                                    color={useColorModeValue('gray.700', 'white')}
                                    fontSize="xl"
                                    fontFamily="body">
                                    <Text noOfLines={3}>{title}</Text>
                                </Heading>
                            </LinkOverlay>
                        </Link>
                        <Text color="gray.500" noOfLines={4}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </Stack>
                </Stack>
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={authorAvatar} bg="green.500" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight="600">{author}</Text>
                        <Text color="gray.500">
                            {date} · {timeToRead} min to read
                        </Text>
                    </Stack>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default BlogPostCard;
