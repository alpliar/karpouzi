import { Badge, Icon, IconProps } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
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
}

const ProductCardBadge: React.FC<IProps> = ({ positionX, positionY, icon, text }) => {
    const position = getPositionAttributes(positionX, positionY);
    return (
        <Badge
            px="2"
            py="1"
            borderRadius="none"
            position="absolute"
            {...position}
            bg="teal.600"
            color="white">
            <Icon as={icon} />
            {text}
        </Badge>
    );
};

export default ProductCardBadge;
