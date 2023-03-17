import { Badge, Icon, IconProps } from '@chakra-ui/react';
import { ComponentWithAs, ThemingProps } from '@chakra-ui/system';
import { IconType } from 'react-icons';

interface IBadgePositionAttributes {
    top?: string;
    left?: string;
    right?: string;
    center?: string;
    bottom?: string;
}

const getPositionAttributes = (positionX: string, positionY: string) => {
    const attributes: IBadgePositionAttributes = {};

    if (positionX === 'left') {
        attributes.left = '0em';
        // if (positionY === 'top') attributes.borderTopLeftRadius = 'lg';
    }

    if (positionX === 'right') {
        attributes.right = '0em';
        // if (positionY === 'top') attributes.borderTopRightRadius = 'lg';
    }

    if (positionX === 'center') attributes.left = '50%';
    if (positionY === 'top') attributes.top = '0em';
    if (positionY === 'bottom') attributes.bottom = '0em';
    if (positionY === 'center') attributes.top = '50%';

    return attributes;
};

type BadgePosition = 'left' | 'right' | 'center' | 'top' | 'bottom' | 'center';
interface IProps {
    positionX: BadgePosition;
    positionY: BadgePosition;
    icon: IconType | ComponentWithAs<'svg', IconProps>;
    text: string;
    colorScheme?: ThemingProps['colorScheme'];
}

const ProductCardBadge: React.FC<IProps> = ({ positionX, positionY, icon, text, colorScheme }) => {
    const position = getPositionAttributes(positionX, positionY);
    const bgColor = colorScheme ? `${colorScheme}.600` : 'green.600';
    return (
        <Badge
            display="flex"
            alignItems="center"
            fontSize={{ base: '2xs', sm: '2xs', xl: 'xs' }}
            px={{ base: 1, sm: 2 }}
            py={{ sm: 0.5 }}
            borderRadius="none"
            position="absolute"
            {...position}
            bgColor={bgColor}
            color="white">
            <Icon as={icon} mr={1} />
            {text}
        </Badge>
    );
};

export default ProductCardBadge;
