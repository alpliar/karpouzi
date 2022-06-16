import { CheckCircleIcon } from '@chakra-ui/icons';
import {
    HStack,
    Icon,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
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
        <Stack spacing={1} padding={5} rounded="md" bg="blackAlpha.100">
            <Text as="cite" fontFamily="cursive" fontSize="2xl">
                {review.message}
            </Text>

            <Rating rate={review.rating} />

            <Wrap fontSize="sm" alignItems="center">
                <HStack as={WrapItem}>
                    <Icon as={FaUserCircle} />
                    <Text as="strong">
                        {review.author.firstName} ({review.author.postalAddress.countryName})
                    </Text>
                </HStack>

                <WrapItem>
                    <Date dateString={review.createdAt} />
                </WrapItem>

                {review.isVerified && (
                    <Tag variant="subtle" colorScheme="green">
                        <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
                        <TagLabel fontSize="xs" fontFamily="monospace">
                            Verified review
                        </TagLabel>
                    </Tag>
                )}
            </Wrap>

            {/* <Box>
                <Text>{review.rating} / 100</Text>
                <Progress colorScheme="green" size="sm" value={review.rating} />
            </Box> */}
        </Stack>
    );
};

export default Review;
