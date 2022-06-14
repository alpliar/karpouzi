import Icon from '@chakra-ui/icon';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GiFountainPen, GiOpenBook } from 'react-icons/gi';
import BlockQuote from '../../../components/blockQuote';
import Date from '../../../components/Date';
import { Image } from '../../../components/image';
import PageListingLayout from '../../../components/pageListingLayout';
import { API_BASE_URL } from '../../../constants/api';
import BlogPost, { BlogPostsData } from '../../../graphql/models/blog/post.model';
import errorHandler from '../../../utils/errorsHandler';
import { BlogPostResponse } from '../../api/blog/post/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { post }
        } = await axios.get<BlogPostResponse>(API_BASE_URL + '/blog/post/' + slug);

        return {
            props: {
                post
            }
        };
    } catch (err) {
        console.error(errorHandler(err));
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {
            data: { posts }
        } = await axios.post<BlogPostsData>(API_BASE_URL + '/blog/posts');

        if (!posts) throw new Error('Could not fetch blog posts data');

        return {
            paths: posts.map(({ slug }) => ({
                params: {
                    slug
                },
                locale: 'en'
            })),
            fallback: true
        };
    } catch (err) {
        return {
            paths: [],
            fallback: true
        };
    }
};

const BlogPostPage = ({ post }: { post: BlogPost }) => {
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '50vw' });

    if (!post) return null;

    // const BlogBanner = chakra(Banner, {
    //     baseStyle: {
    //         maxWidth: '70ch'
    //     }
    // });

    return (
        <PageListingLayout
            title={post.title}
            breadcrumbs={[
                {
                    text: 'Blog',
                    link: '/blog',
                    alt: 'go back to blog home',
                    isCurrentPage: false
                },
                { text: post.slug, link: '', alt: '', isCurrentPage: true }
            ]}
            titleSlot={
                <Stack spacing={0}>
                    <HStack>
                        <Icon as={GiOpenBook} />
                        <Text>{post.timeToRead} min read</Text>
                    </HStack>
                    <HStack>
                        <Icon as={GiFountainPen} />
                        <Date dateString={post.createdAt} />
                    </HStack>
                </Stack>
            }
            introSlot={
                <BlockQuote noOfLines={3} author="Author">
                    {post.subtitle}
                </BlockQuote>
            }
            bannerSlot={<></>}>
            <Stack>
                <Image
                    src={post.coverPicture.asset.url}
                    alt={post.coverPicture.alternativeText}
                    sizes={pictureSizes}
                    priority
                    width="full"
                    height={{ base: '3xs', md: 'sm', xl: 'md' }}
                    quality={75}
                    blurDataURL={post.coverPicture.asset.thumbnail}
                    objectFit="contain"
                />
                <Box>
                    <Box maxW="70ch" fontSize={{ md: 'xl' }} margin="auto">
                        {post.content}
                    </Box>
                </Box>
            </Stack>
        </PageListingLayout>
    );
};

export default BlogPostPage;
