import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Review from '../graphql/models/common/review.model';
import Date from './Date';
import Rating from './rating';

type Props = {
    review: Review;
};

const Review: React.FC<Props> = ({ review }) => {
    if (!review) return null;
    return (
        <Stack padding={5} rounded="md" bg="blackAlpha.100">
            <HStack alignItems="center">
                <Icon as={FaUserCircle} />
                <Text as="strong">
                    {review.author.firstName} ({review.author.postalAddress.countryName})
                </Text>
                <Date dateString={review.createdAt} />
            </HStack>
            {review.isVerified && (
                <Text>
                    <CheckCircleIcon /> Verified review
                </Text>
            )}
            <Text as="cite" fontFamily="cursive" fontSize="xl">
                {review.message}
            </Text>

            <Rating rate={review.rating} />
            {/* <Box>
                <Text>{review.rating} / 100</Text>
                <Progress colorScheme="green" size="sm" value={review.rating} />
            </Box> */}
        </Stack>
    );
};

export default Review;
