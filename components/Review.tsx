import { CheckCircleIcon } from '@chakra-ui/icons';
import {
    Collapse,
    Divider,
    Flex,
    HStack,
    Icon,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text
} from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import IReview from '../graphql/models/common/review.model';
import Date from './Date';
import Rating from './rating';

type Props = {
    review: IReview;
};

const Review: React.FC<Props> = ({ review }) => {
    const { formatMessage } = useIntl();

    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    if (!review) return null;
    return (
        <Stack spacing={1} padding={5} rounded="md" bg="surface">
            <Collapse onClick={handleToggle} startingHeight={150} in={show}>
                <Text
                    cursor={show ? undefined : 'pointer'}
                    flexGrow={1}
                    as="cite"
                    fontFamily="body"
                    fontStyle="normal"
                    position="relative"
                    display="block">
                    {review.message}
                </Text>
            </Collapse>
            <Divider />

            <Rating rate={review.rating} />

            <Flex wrap="wrap" fontSize="sm" alignItems="center" gap={2}>
                <HStack>
                    <Icon as={FaUserCircle} />
                    <Text as="strong">
                        {review.author.firstName} ({review.author.postalAddress.countryName})
                    </Text>
                </HStack>

                <Date dateString={review.createdAt} />

                {review.isVerified && (
                    <Tag variant="subtle" colorScheme="green">
                        <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
                        <TagLabel fontSize="xs" fontFamily="monospace">
                            {formatMessage({ id: 'verifiedReview' })}
                        </TagLabel>
                    </Tag>
                )}
            </Flex>

            {/* <Box>
                <Text>{review.rating} / 100</Text>
                <Progress colorScheme="green" size="sm" value={review.rating} />
            </Box> */}
        </Stack>
    );
};

export default Review;
