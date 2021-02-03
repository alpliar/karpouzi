import Link from 'next/link';
import PropTypes from 'prop-types';
import { Text } from 'theme-ui';
import { Card, Col, Row } from 'antd';

const LatestsPosts = ({ posts }) => {
    return (
        <>
            <Text
                sx={{
                    fontWeight: 'bold'
                }}>
                Blog
            </Text>
            <Row gutter={16}>
                {posts.map(({ id, date, title }) => (
                    <Col span={8} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a href={`/posts/${id}`}>
                                <Card title={title}>
                                    <Text>{id}</Text>
                                    <Text>{date}</Text>
                                </Card>
                            </a>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default LatestsPosts;

LatestsPosts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    )
};
