import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Review from '../graphql/models/common/review.model';
import ReviewComponent from './Review';

interface ReviewsProps {
    reviews: Array<Review>;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <>
            <Heading>Reviews</Heading>
            {!reviews.length && <Text>No reviews yet, be the first to do it !</Text>}
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
