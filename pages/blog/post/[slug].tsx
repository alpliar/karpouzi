import Icon from '@chakra-ui/icon';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GiFountainPen, GiOpenBook } from 'react-icons/gi';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import BlockQuote from '../../../components/blockQuote';
import Date from '../../../components/Date';
import { Image } from '../../../components/image';
import MarkdownRendered from '../../../components/MarkdownRendered';
import PageListingLayout from '../../../components/pageListingLayout';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_DAY } from '../../../constants/time.constants';
import BlogPost, { BlogPostsData } from '../../../graphql/models/blog/post.model';
import MarkdownHelper from '../../../helpers/markdown.helper';
import errorHandler from '../../../utils/errorsHandler';
import { BlogPostResponse } from '../../api/blog/post/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { post }
        } = await axios.get<BlogPostResponse>(API_BASE_URL + '/blog/post/' + slug);

        if (!post) throw new Error('Could not fetch post');

        const postContent = MarkdownHelper.parseMarkdown(post.content);

        return {
            props: {
                post,
                postContent
            },
            revalidate: ONE_DAY
        };
    } catch (err) {
        console.error(errorHandler(err));
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    try {
        const {
            data: { posts }
        } = await axios.post<BlogPostsData>(API_BASE_URL + '/blog/posts');

        if (!posts) throw new Error('Could not fetch blog posts data');
        if (!locales) throw new Error('no locales provided in next.config.js');

        return {
            paths: posts.flatMap(({ slug }) => {
                return locales.map((locale) => {
                    return {
                        params: {
                            slug
                        },
                        locale
                    };
                });
            }),
            fallback: true
        };
    } catch (err) {
        return {
            paths: [],
            fallback: true
        };
    }
};

const BlogPostPage = ({ post, postContent }: { post: BlogPost; postContent: Root }) => {
    const { asPath } = useRouter();
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '50vw' });

    const intl = useIntl();
    const f = (id: string, values?: any) => intl.formatMessage({ id }, values);

    if (!post) return null;

    const authorName = post.authors[0].firstName;
    // const BlogBanner = chakra(Banner, {
    //     baseStyle: {
    //         maxWidth: '70ch'
    //     }
    // });

    return (
        <>
            {post.meta && (
                <Head>
                    <title>{post.meta.title ? post.meta.title : post.title}</title>
                    {post.meta.title && <meta property="og:title" content={post.meta.title} />}
                    {post.meta.description && (
                        <>
                            <meta name="description" content={post.meta.description} />
                            <meta property="og:description" content={post.meta.description} />
                        </>
                    )}
                    {post.meta.keywords && (
                        <meta property="keywords" content={post.meta.keywords.join(',')} />
                    )}
                    {post.meta.openGraphImage.url && (
                        <meta property="og:image" content={post.meta.openGraphImage.url} />
                    )}
                    <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + asPath} />
                    <meta property="og:type" content="article" />
                    <meta property="og:author" content={authorName} />
                </Head>
            )}
            <PageListingLayout
                title={post.title}
                breadcrumbs={[
                    {
                        text: f('menuEntryBlog'),
                        link: '/blog',
                        alt: intl.formatMessage(
                            { id: 'goToPageName' },
                            { name: f('menuEntryBlog') }
                        ),
                        isCurrentPage: false
                    },
                    { text: post.slug, link: '', alt: '', isCurrentPage: true }
                ]}
                titleSlot={
                    <Stack spacing={0}>
                        <HStack>
                            <Icon as={GiOpenBook} />
                            <Text>{f('noMinutesToRead', { minutes: post.timeToRead })}</Text>
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
                    <Box>
                        <Box maxW="70ch" fontSize={{ md: 'xl' }} margin="auto">
                            {/* {post.content} */}
                            <Box float={{ lg: 'left' }} rounded="lg" overflow="hidden">
                                <Image
                                    src={post.coverPicture.asset.url}
                                    alt={post.coverPicture.alternativeText}
                                    sizes={pictureSizes}
                                    priority
                                    width={{ base: 'full', lg: 480 }}
                                    height={{ base: 240, lg: 480 }}
                                    mr={8}
                                    mb={8}
                                    quality={75}
                                    blurDataURL={post.coverPicture.asset.thumbnail}
                                    objectFit="contain"
                                />
                            </Box>
                            <MarkdownRendered ast={postContent} />
                        </Box>
                    </Box>
                </Stack>
            </PageListingLayout>
        </>
    );
};

export default BlogPostPage;
