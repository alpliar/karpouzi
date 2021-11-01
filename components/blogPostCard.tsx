import {
    Avatar,
    Box,
    Heading,
    Img,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from './card';

const karpouziAvatar = require('../public/icon-48x48.png');

const BlogPostCard = ({ title, date, slug, author, authorAvatar }) => {
    return (
        <LinkBox>
            <Card>
                <Box
                    maxH={64}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow="hidden">
                    <Img
                        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        layout="fill"
                    />
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight="800"
                        fontSize="sm"
                        letterSpacing="1.1">
                        Blog
                    </Text>
                    <Stack h={32}>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'xl'}
                            fontFamily={'body'}>
                            <Link
                                href={{
                                    pathname: '/blog/post/[slug]',
                                    query: { slug }
                                }}
                                passHref>
                                <LinkOverlay>
                                    <Text noOfLines={3}>{title}</Text>
                                </LinkOverlay>
                            </Link>
                        </Heading>
                        <Text color={'gray.500'} noOfLines={3}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </Stack>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar src={authorAvatar} alt={'Author'} bg="blackAlpha.400" />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight="600">{author}</Text>
                        <Text color={'gray.500'}>{date} · 6min read</Text>
                    </Stack>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default BlogPostCard;

BlogPostCard.defaultProps = {
    author: 'Karpouzi',
    authorAvatar: karpouziAvatar
};

BlogPostCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.string,
    authorAvatar: PropTypes.string
};
