import Icon from '@chakra-ui/icon';
import { Flex, HStack, IconProps, Text } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import { IconType } from 'react-icons';
import { GiWatermelon } from 'react-icons/gi';
import { useIntl } from 'react-intl';

interface IOwnProps {
    rate: number;
    count?: number;
    icon?: ComponentWithAs<'svg', IconProps> | IconType | undefined;
}

const Rating = ({ rate, count, icon = GiWatermelon }: IOwnProps) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);
    const isRated = (rate as number) > 0;
    const hasMultipleReviews = count; //&& count > 1;
    const isIndividualRating = !count;

    return (
        <Flex fontSize="sm" alignItems="center" minH={8}>
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
                            {f('noOfReviews', { count })}
                            {/* {count} review(s) */}
                        </Text>
                    )}
                </HStack>
            )}

            {!isRated && <Text as="span">{f('noReviewsYet')}</Text>}
        </Flex>
    );
};

export default Rating;
