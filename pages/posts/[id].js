import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { Card, Container, Heading } from 'theme-ui';
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
            <Container p={4} bg="muted">
                <Card>
                <div className="max-w-screen-md mx-auto text-left py-4">
                    <Heading as="h1">{postData.title}</Heading>
                    <span>
                        {postData.id},{' '}
                        <strong>
                            <Date dateString={postData.date} />
                        </strong>
                    </span>
                    <div
                        className="py-4"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </div>
                </Card>
            </Container>
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
