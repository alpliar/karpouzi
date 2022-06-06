import Icon from '@chakra-ui/icon';
import { Flex, Text } from '@chakra-ui/layout';
import { IconProps } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import { IconType } from 'react-icons';
import { GiWatermelon } from 'react-icons/gi';

interface IOwnProps {
    rate: number;
    count: number;
    icon?: ComponentWithAs<'svg', IconProps> | IconType | undefined;
}

const Rating = ({ rate, count, icon = GiWatermelon }: IOwnProps) => {
    return (
        <Flex as={Text} alignItems="end">
            {!!count &&
                Array(5)
                    .fill('')
                    .map((_, i) => (
                        <Icon
                            boxSize={6}
                            as={icon}
                            key={i}
                            color={i < rate ? 'teal.500' : 'gray.300'}
                        />
                    ))}
            <Text
                /* isTruncated */ as="span"
                marginLeft={!!count ? 2 : 0}
                /*color="gray.600"*/ fontSize="sm">
                {!!count ? count.toString() : 'No'} review{!!count ? 's' : ' yet'}
            </Text>
        </Flex>
    );
};

export default Rating;
