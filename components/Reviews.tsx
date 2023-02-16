import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useIntl } from 'react-intl';
import Review from '../graphql/models/common/review.model';
import ReviewComponent from './Review';

interface ReviewsProps {
    reviews: Array<Review>;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    return (
        <>
            <Heading>{f('reviews')}</Heading>
            {!reviews.length && <Text>{f('beTheFirstToLeaveReview')}</Text>}
            {reviews.length > 0 && (
                <Stack>
                    {reviews.map((review) => {
                        return <ReviewComponent review={review} key={review.id} />;
                    })}
                </Stack>
            )}
        </>
    );
};

export default Reviews;
