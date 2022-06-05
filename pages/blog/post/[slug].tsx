import Icon from '@chakra-ui/icon';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { GiFountainPen, GiOpenBook } from 'react-icons/gi';
import Banner from '../../../components/banner';
import BlockQuote from '../../../components/blockQuote';
import Date from '../../../components/Date';
import PageListingLayout from '../../../components/pageListingLayout';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import { sanitizeText } from '../../../utils/sanitize';

interface Post {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
}
interface Props {
    postData: Post;
}

const Page: NextPage<Props> = ({ postData }) => {
    const BlogBanner = chakra(Banner, {
        baseStyle: {
            maxWidth: '70ch'
        }
    });

    if (!postData) {
        return null;
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
                <Stack spacing={0}>
                    <HStack>
                        <Icon as={GiOpenBook} />
                        <Text>6min read</Text>
                    </HStack>
                    <HStack>
                        <Icon as={GiFountainPen} />
                        <Date dateString={postData.date} />
                    </HStack>
                </Stack>
            }
            introSlot={
                <BlockQuote noOfLines={3} author="Author">
                    Article subtitle goes there.
                </BlockQuote>
            }
            bannerSlot={null}>
            <Stack>
                <BlogBanner pattern="leaf">
                    <Stack maxW="md" fontSize="sm" fontWeight="bold" p={3}>
                        <Heading>Leaves !</Heading>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum minima
                            quaerat fugit ullam illo ipsa perspiciatis sit voluptatem!
                        </Text>
                    </Stack>
                </BlogBanner>
                <Box>
                    <Box
                        maxW="70ch"
                        fontSize={{ md: 'xl' }}
                        margin="auto"
                        className="externalHtml"
                        dangerouslySetInnerHTML={{ __html: sanitizeText(postData.contentHtml) }}
                    />
                </Box>
            </Stack>
        </PageListingLayout>
    );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { params } = context;
    const slug = params?.slug?.toString() || '';

    const postData = await getPostData(slug);
    return {
        props: {
            postData
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: true
    };
};

export default Page;
