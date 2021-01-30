import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import PropTypes from 'prop-types';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div className="md:container md:mx-auto px-4 text-center">
                <h2 className="text-xl tracking-tight font-extrabold text-indigo-600 sm:text-2xl md:text-3xl">
                    {postData.title}
                </h2>
                <br />
                {postData.id}
                <br />
                <Date dateString={postData.date} />
                <br />
                <div
                    className="max-w-screen-md mx-auto text-left py-4"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </div>
        </Layout>
    );
}

Post.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired
    }).isRequired
};
