import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Progress, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Review from '../graphql/models/common/review.model';

type Props = {
    review: Review;
};

const Review: React.FC<Props> = ({ review }) => {
    if (!review) return null;
    return (
        <Stack padding={5} rounded="md" bg="blackAlpha.100">
            <Text as="strong">
                From {review.author.firstName} ({review.author.postalAddress.countryName})
            </Text>
            {review.isVerified ?? (
                <Text>
                    <CheckCircleIcon /> Verified review
                </Text>
            )}
            <Text as="cite">{review.message}</Text>

            <Box>
                <Text>{review.rating} / 100</Text>
                <Progress colorScheme="green" size="sm" value={review.rating} />
            </Box>
        </Stack>
    );
};

export default Review;
