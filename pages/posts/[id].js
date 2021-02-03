import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { Container, Heading } from 'theme-ui';
import PropTypes from 'prop-types';
import { Card } from 'antd';

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
            <Container
                p={4}
                bg="muted"
                sx={{
                    maxWidth: '1024px'
                }}>
                <Card title={postData.title} bordered={false}>
                    <span>
                        {postData.id},{' '}
                        <strong>
                            <Date dateString={postData.date} />
                        </strong>
                    </span>
                    <Container dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </Card>

                {/* <Card>
                    <div
                        style={{
                            textAlign: 'center'
                        }}>
                        <Heading as="h1">{postData.title}</Heading>
                        <span>
                            {postData.id},{' '}
                            <strong>
                                <Date dateString={postData.date} />
                            </strong>
                        </span>
                    </div>
                    <Container dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </Card> */}
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
