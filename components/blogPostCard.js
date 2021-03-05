import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    LinkBox,
    LinkOverlay
} from '@chakra-ui/react';
import karpouziAvatar from '../public/icon-48x48.png';

const BlogPostCard = ({ title, date, slug }) => {
    return (
        <LinkBox>
            <Center py={6}>
                <Box
                    maxW={'445px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                        <Image
                            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            layout={'fill'}
                        />
                    </Box>
                    <Stack>
                        <Text
                            color={'green.500'}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}>
                            Blog
                        </Text>
                        <Heading
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            fontFamily={'body'}>
                            <Link
                                href={{
                                    pathname: '/blog/posts/[slug]',
                                    query: { slug }
                                }}
                                passHref>
                                <LinkOverlay>{title}</LinkOverlay>
                            </Link>
                        </Heading>
                        <Text color={'gray.500'}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        </Text>
                    </Stack>
                    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                        <Avatar src={karpouziAvatar} alt={'Author'} />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <Text fontWeight={600}>Karpouzi</Text>
                            <Text color={'gray.500'}>{date} · 6min read</Text>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
        </LinkBox>
    );
};

export default BlogPostCard;

BlogPostCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
};
