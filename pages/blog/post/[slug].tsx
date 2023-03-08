import Icon from '@chakra-ui/icon';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GiFountainPen, GiOpenBook } from 'react-icons/gi';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import Date from '../../../components/Date';
import { Image } from '../../../components/image';
import Section from '../../../components/layout/Section';
import MarkdownRendered from '../../../components/MarkdownRendered';
import PageListingLayout from '../../../components/pageListingLayout';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_DAY } from '../../../constants/time.constants';
import BlogPost, {
    BlogPostsData,
    ParsedBlogPostLocalization,
    ParsedBlogPostLocalizations
} from '../../../graphql/models/blog/post.model';
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

        const localizations: ParsedBlogPostLocalizations =
            post.localizations?.map((locale) => ({
                ...locale,
                content: MarkdownHelper.parseMarkdown(locale.content)
            })) || [];
        const postContent = MarkdownHelper.parseMarkdown(post.content);

        return {
            props: {
                post,
                postContent,
                localizations
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

const BlogPostPage = ({
    post,
    postContent,
    localizations
}: {
    post: BlogPost;
    postContent: Root;
    localizations: ParsedBlogPostLocalizations;
}) => {
    const { asPath } = useRouter();
    const router = useRouter();

    const intl = useIntl();
    const f = (id: string, values?: any) => intl.formatMessage({ id }, values);

    if (!post) return null;

    const authorName = post.authors[0].firstName;
    // const BlogBanner = chakra(Banner, {
    //     baseStyle: {
    //         maxWidth: '70ch'
    //     }
    // });

    const localized: ParsedBlogPostLocalization | undefined = localizations.find(
        (i18n) => i18n.locale === router.locale
    );

    const title = localized?.title || post.title;
    const content = localized?.content || postContent;

    return (
        <>
            {post.meta && (
                <Head>
                    <title>{post.meta.title ? post.meta.title : post.title}</title>
                    {post.meta.title && (
                        <meta property="og:title" content={post.meta.title || title} />
                    )}
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
                fullWidth
                title={title}
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
                subtitle={post.subtitle}>
                <Stack spacing={0}>
                    <Section
                        title={''}
                        image={post.coverPicture.asset.url}
                        imageThumbnail={post.coverPicture.asset.thumbnail}
                        useSecondaryColor
                        component={
                            <Stack>
                                <HStack>
                                    <Icon as={GiOpenBook} />
                                    <Text>
                                        {f('noMinutesToRead', { minutes: post.timeToRead })}
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Icon as={GiFountainPen} />
                                    <Date dateString={post.createdAt} />
                                </HStack>
                                <HStack>
                                    <Image
                                        quality={60}
                                        alt="Karpouzi"
                                        src={'/icon-48x48.png'}
                                        sizes="48"
                                        height={5}
                                        width={5}
                                    />
                                    <Text>{post.authors[0].firstName}</Text>
                                </HStack>
                            </Stack>
                        }
                    />
                    <Section
                        title=""
                        component={
                            <Box fontSize={{ md: 'xl' }}>
                                <Stack spacing={4} /* maxW="70ch" */>
                                    <MarkdownRendered ast={content} />
                                </Stack>
                            </Box>
                        }
                    />
                </Stack>
            </PageListingLayout>
        </>
    );
};

export default BlogPostPage;
