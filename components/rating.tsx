import Icon from '@chakra-ui/icon';
import { Flex, FlexProps, IconProps, Link as ChakraLink, Text } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import { IconType } from 'react-icons';
import { GiWatermelon } from 'react-icons/gi';
import { useIntl } from 'react-intl';

interface RatingProps {
    rate: number;
    count?: number;
    icon?: ComponentWithAs<'svg', IconProps> | IconType | undefined;
    target?: string;
}

const Rating: React.FC<RatingProps & FlexProps> = ({
    rate,
    count,
    icon = GiWatermelon,
    target = undefined,
    ...rest
}) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);
    const isRated = (rate as number) > 0;
    const hasMultipleReviews = count; //&& count > 1;
    const isIndividualRating = !count;

    return (
        <Flex {...rest}>
            {isRated && (
                <Flex
                    gap={1}
                    wrap="wrap"
                    as={target ? ChakraLink : undefined}
                    href={target}
                    alignItems="center">
                    <Flex as="span" align="center">
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <Icon
                                    boxSize="1rem"
                                    as={icon}
                                    key={i}
                                    color={i < rate / 20 ? 'currentColor' : 'gray.300'}
                                />
                            ))}
                    </Flex>
                    {isIndividualRating && <Text as="strong">{rate / 20} / 5</Text>}
                    {hasMultipleReviews && (
                        <Text fontWeight="bold" as="span">
                            {f('noOfReviews', { count })}
                        </Text>
                    )}
                </Flex>
            )}

            {!isRated && <Text as="span">{f('noReviewsYet')}</Text>}
        </Flex>
    );
};

export default Rating;
