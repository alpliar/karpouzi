import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card, Heading, Link as UiLink, Text } from 'theme-ui';

const LatestsPosts = ({ posts }) => {
    return (
        <>
            <Heading as="h1">Blog</Heading>
            <ul>
                {posts.map(({ id, date, title }) => (
                    <Link href={`/posts/${id}`} key={id}>
                        <Card as="li">
                            <UiLink href={`/posts/${id}`}>
                                <Heading>{title}</Heading>
                            </UiLink>
                            <Text>{id}</Text>
                            <Text>{date}</Text>
                        </Card>
                    </Link>
                ))}
            </ul>
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
