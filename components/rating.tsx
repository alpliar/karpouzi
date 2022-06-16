import Icon from '@chakra-ui/icon';
import { Flex, HStack, IconProps, Text } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import { IconType } from 'react-icons';
import { GiWatermelon } from 'react-icons/gi';

interface IOwnProps {
    rate?: number;
    count?: number;
    icon?: ComponentWithAs<'svg', IconProps> | IconType | undefined;
}

const Rating = ({ rate, count, icon = GiWatermelon }: IOwnProps) => {
    const isRated = typeof rate === 'number';
    const hasMultipleReviews = typeof count === 'number';
    const isIndividualRating = !hasMultipleReviews;

    return (
        <Flex as={Text} fontSize="sm" alignItems="end">
            {isRated && (
                <HStack alignItems="center">
                    <Text as="span">
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <Icon
                                    boxSize={6}
                                    as={icon}
                                    key={i}
                                    color={i < rate / 20 ? 'teal.500' : 'gray.300'}
                                />
                            ))}
                    </Text>
                    {isIndividualRating && (
                        <Text as="strong" fontSize="xl">
                            {rate / 20} / 5
                        </Text>
                    )}
                    {hasMultipleReviews && (
                        <Text
                            /* isTruncated */ as="span"
                            marginLeft={!!count ? 2 : 0}
                            /*color="gray.600"*/
                        >
                            {count} review(s)
                        </Text>
                    )}
                </HStack>
            )}

            {!isRated && <Text as="span">No reviews yet</Text>}
        </Flex>
    );
};

export default Rating;
