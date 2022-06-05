import { NextPage } from 'next';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { SET_POSTS_DATA } from '../../actions/blog';
import BlockQuote from '../../components/blockQuote';
import LatestsPosts from '../../components/LatestsPosts';
import PageListingLayout from '../../components/pageListingLayout';
import ShopStat from '../../components/shopStat';
import { getSortedPostsData } from '../../lib/posts';
import { RootState } from '../../reducer';
import { wrapper } from '../../store';

export const getStaticProps = wrapper.getStaticProps((store) => () => {
    // const postsData = getSortedPostsData();
    store.dispatch({ type: SET_POSTS_DATA, posts: getSortedPostsData() });
    return { props: {} };
});

const BlogHome: NextPage = () => {
    const { posts } = useSelector((state: RootState) => state.server);
    const intl = useIntl();
    const f = (id: string) => intl.formatMessage({ id });

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
            titleSlot={<ShopStat label="Posts" number={posts?.length ?? 0} textAlign="right" />}
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
