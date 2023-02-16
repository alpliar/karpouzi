import axios from 'axios';
import { GetStaticProps } from 'next';
import { useIntl } from 'react-intl';
import BlockQuote from '../../components/blockQuote';
import LatestsPosts from '../../components/LatestsPosts';
import PageListingLayout from '../../components/pageListingLayout';
import ShopStat from '../../components/shopStat';
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
    const intl = useIntl();
    const f = (id: string) => intl.formatMessage({ id });

    if (!posts) return null;

    return (
        <PageListingLayout
            title={f('title')}
            breadcrumbs={[
                {
                    text: f('home'),
                    link: '/',
                    alt: intl.formatMessage({ id: 'goToPageName' }, { name: f('home') }),
                    isCurrentPage: false
                },
                {
                    text: f('title'),
                    link: '/blog',
                    alt: intl.formatMessage({ id: 'goToPageName' }, { name: f('title') }),
                    isCurrentPage: true
                }
            ]}
            titleSlot={
                <ShopStat label={f('posts')} number={posts?.length ?? 0} textAlign="right" />
            }
            introSlot={
                <BlockQuote noOfLines={3}>
                    She put his pistol down, picked up her fletcher, dialed the barrel over to
                    single shot, and very carefully put a toxin dart through the center of a broken
                    mirror bent and elongated as they fell. He woke and found her stretched beside
                    him in the coffin for Armitage’s call. Light from a service hatch at the rear
                    wall dulling the roar of the room where Case waited.
                </BlockQuote>
            }>
            {posts && <LatestsPosts posts={posts} />}
        </PageListingLayout>
    );
};

export default BlogHome;
