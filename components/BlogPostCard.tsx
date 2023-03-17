import { Avatar, Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import BlogPost from '../graphql/models/blog/post.model';
import Card from './Card';
import Date from './Date';
import ImageV2 from './ImageV2';

interface IBlogPostCardProps {
    post: BlogPost;
}

const BlogPostCard: React.FC<IBlogPostCardProps> = ({ post }) => {
    const [author] = post.authors;

    return (
        <LinkBox>
            <Card>
                <Box mt={-6} mx={-6} mb={6} pos="relative" overflow="hidden">
                    <ImageV2
                        src={post.coverPicture.asset.url}
                        alt={post.coverPicture.alternativeText}
                        priority
                        blurDataURL={post.coverPicture.asset.thumbnail}
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
                            legacyBehavior
                            passHref
                            href={{
                                pathname: '/blog/post/[slug]',
                                query: { slug: post.slug }
                            }}>
                            <LinkOverlay
                                textDecoration="none"
                                _hover={{
                                    textDecoration: 'underline'
                                }}
                                transition="all 1s">
                                <Heading fontSize="xl" fontFamily="body" noOfLines={3}>
                                    {post.title}
                                </Heading>
                            </LinkOverlay>
                        </Link>
                        <Text color="gray.500" noOfLines={4}>
                            {post.content}
                        </Text>
                    </Stack>
                </Stack>
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={'/icon-48x48.png'} bg="green.500" name={'Karpouzi'} />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight="600">{author.firstName}</Text>
                        <Text color="gray.500">
                            <Date dateString={post.createdAt} /> · {post.timeToRead} min to read
                        </Text>
                    </Stack>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default BlogPostCard;
