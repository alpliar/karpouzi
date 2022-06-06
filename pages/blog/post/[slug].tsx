import Icon from '@chakra-ui/icon';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GiFountainPen, GiOpenBook } from 'react-icons/gi';
import Banner from '../../../components/banner';
import BlockQuote from '../../../components/blockQuote';
import Date from '../../../components/Date';
import PageListingLayout from '../../../components/pageListingLayout';
import { API_BASE_URL } from '../../../constants/api';
import BlogPost from '../../../graphql/models/blog/post.model';
import { getAllPostIds } from '../../../lib/posts';
import { BlogPostResponse } from '../../api/blog/post/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { post }
        } = await axios.get<BlogPostResponse>(API_BASE_URL + '/blog/post/' + slug);

        if (!post) throw new Error('Could not fetch blogpost data');

        return {
            props: {
                post
            }
        };
    } catch (err) {
        // console.error(err);
        return {
            notFound: true
        };
    }
};

const BlogPostPage = ({ post }: { post: BlogPost }) => {
    if (!post) {
        return null;
    }

    const BlogBanner = chakra(Banner, {
        baseStyle: {
            maxWidth: '70ch'
        }
    });

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
            bannerSlot={null}>
            <Stack>
                <BlogBanner pattern="leaf">
                    <Stack maxW="md" fontSize="sm" fontWeight="bold" p={3}>
                        <Heading>Leaves !</Heading>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum minima
                            quaerat fugit ullam illo ipsa perspiciatis sit voluptatem!
                        </Text>
                    </Stack>
                </BlogBanner>
                <Box>
                    <Box maxW="70ch" fontSize={{ md: 'xl' }} margin="auto">
                        {post.content}
                    </Box>
                </Box>
            </Stack>
        </PageListingLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: true
    };
};

export default BlogPostPage;
