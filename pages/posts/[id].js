import Layout from '../../components/layout';
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
            <div className="container mx-auto px-4">
                <h2 className="text-xl tracking-tight font-extrabold text-indigo-600 sm:text-2xl md:text-3xl">
                    {postData.title}
                </h2>
                <span className="text-xl tracking-tight font-bold">
                    <br />
                    {postData.id}
                    <br />
                    {postData.date}
                </span>
            </div>
        </Layout>
    );
}

Post.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }).isRequired
};
