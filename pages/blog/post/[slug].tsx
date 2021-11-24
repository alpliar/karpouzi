import { Avatar } from '@chakra-ui/avatar';
import Icon from '@chakra-ui/icon';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { GiOpenBook } from 'react-icons/gi';
import Date from '../../../components/Date';
import PageListingLayout from '../../../components/pageListingLayout';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import { sanitizeText } from '../../../utils/sanitize';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.slug);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: true
    };
}

export default function Post({ postData }) {
    if (!postData) {
        return false;
    }
    return (
        <PageListingLayout
            title={postData.title}
            breadcrumbs={[
                {
                    text: 'Blog',
                    link: '/blog',
                    alt: 'go back to blog home',
                    isCurrentPage: false
                },
                { text: postData.id, link: '', alt: '', isCurrentPage: true }
            ]}
            titleSlot={
                <HStack>
                    <Icon as={GiOpenBook} />
                    <Text>6min read</Text>
                </HStack>
            }
            introSlot={
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={'/icon-48x48.png'} alt="Author" bg="green.500" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Heading size="xs">Karpouzi</Heading>
                        <Text>
                            <Date dateString={postData.date} />
                        </Text>
                    </Stack>
                </Stack>
            }>
            <Box
                className="externalHtml"
                dangerouslySetInnerHTML={{ __html: sanitizeText(postData.contentHtml) }}
            />
        </PageListingLayout>
    );
}

Post.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired
    })
};
