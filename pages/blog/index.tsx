import axios from 'axios';
import { GetStaticProps } from 'next';
import { useIntl } from 'react-intl';
import GridBlogPosts from '../../components/BlogPostsGrid';
import Section from '../../components/layout/Section';
import PageListingLayout from '../../components/PageListingLayout';
import { API_BASE_URL } from '../../constants/api';
import { ONE_HOUR } from '../../constants/time.constants';
import BlogPost from '../../graphql/models/blog/post.model';
import { BlogPostsResponse } from '../api/blog/posts';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const {
            data: { posts }
        } = await axios.get<BlogPostsResponse>(API_BASE_URL + '/blog/posts');

        return {
            props: {
                posts
            },
            revalidate: ONE_HOUR
        };
    } catch (err) {
        return {
            notFound: true
        };
    }
};

const BlogHome = ({ posts }: { posts: Array<BlogPost> }) => {
    const { formatMessage } = useIntl();

    if (!posts) return null;

    return (
        <PageListingLayout
            fullWidth
            title={formatMessage({ id: 'title' })}
            titleComplement={`(${posts.length || 0} ${formatMessage({
                id: 'posts'
            })}`.toLocaleLowerCase()}
            breadcrumbs={[
                {
                    text: formatMessage({ id: 'title' }),
                    link: '/blog',
                    alt: formatMessage(
                        { id: 'goToPageName' },
                        { name: formatMessage({ id: 'title' }) }
                    ),
                    isCurrentPage: true
                }
            ]}
            subtitle={formatMessage({ id: 'blogSubtitle' })}>
            {posts && (
                <Section
                    colorScheme="white"
                    title={formatMessage({ id: 'posts' })}
                    component={<GridBlogPosts posts={posts} />}
                />
            )}
        </PageListingLayout>
    );
};

export default BlogHome;
