import {
    Avatar,
    Box,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import BlogPost from '../graphql/models/blog/post.model';
import Card from './card';
import { Image } from './image';

interface IBlogPostCardProps {
    post: BlogPost;
}

const BlogPostCard: React.FC<IBlogPostCardProps> = ({ post }) => {
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '33vw' });

    const [author] = post.authors;

    return (
        <LinkBox>
            <Card>
                <Box h={64} mt={-6} mx={-6} mb={6} pos="relative" overflow="hidden">
                    {/* <Img
                        alt={post.coverPicture.alternativeText}
                        src={post.coverPicture.asset.url || fallbackPicture}
                    /> */}
                    <Image
                        src={post.coverPicture.asset.url}
                        alt={post.coverPicture.alternativeText}
                        sizes={pictureSizes}
                        priority
                        height={64}
                        quality={100}
                        blurDataURL={post.coverPicture.asset.thumbnail}
                        // bg="#282828"
                        // width={{ base: 'full', sm: '100%' }}
                        // h={{ base: '100vw', sm: 'auto' }}
                        // overflow="hidden"
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
                            <LinkOverlay
                                _hover={{
                                    textShadow: '0.5px 0.5px 0.5px teal'
                                }}>
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
