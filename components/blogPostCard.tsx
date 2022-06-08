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
import BlogPost from '../graphql/models/blog/post.model';
import Card from './card';

interface IBlogPostCardProps {
    post: BlogPost;
}

const BlogPostCard: React.FC<IBlogPostCardProps> = ({ post }) => {
    const [author] = post.authors;
    const fallbackPicture =
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
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
                    <Img
                        alt={post.coverPicture.alternativeText}
                        src={post.coverPicture.asset.url || fallbackPicture}
                    />
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
                                query: { slug: post.slug }
                            }}>
                            <LinkOverlay>
                                <Heading
                                    color={useColorModeValue('gray.700', 'white')}
                                    fontSize="xl"
                                    fontFamily="body">
                                    <Text noOfLines={3}>{post.title}</Text>
                                </Heading>
                            </LinkOverlay>
                        </Link>
                        <Text color="gray.500" noOfLines={4}>
                            {post.content}
                        </Text>
                    </Stack>
                </Stack>
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={'/icon-48x48.png'} bg="green.500" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight="600">{author.firstName}</Text>
                        <Text color="gray.500">
                            {post.createdAt} · {post.timeToRead} min to read
                        </Text>
                    </Stack>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default BlogPostCard;
