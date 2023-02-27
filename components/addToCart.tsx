import { Button, Icon, Tooltip, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { ICartItem } from '../redux/container/addToCart';
import { sendToast } from '../utils/uiToast';
interface IAddToCartProps {
    slug: string;
    name: string;
    quantity: number;
    inCart: number;
    addToCart: (slug: string, quantity: number, cart: Array<ICartItem>) => void;
    cart: Array<ICartItem>;
}

const AddToCart: React.FC<IAddToCartProps> = ({
    slug,
    quantity,
    inCart,
    addToCart,
    cart,
    name
}) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);
    const { isOpen, onToggle } = useDisclosure();

    const handleClick = () => {
        addToCart(slug, quantity, cart);
        sendToast(f('addedToCart'), name, 'success');
    };

    const [hasAccuratePointingDevice] = useMediaQuery('(pointer: fine)');

    return (
        <Tooltip
            hasArrow
            label={f('noAlreadyInCart', { count: inCart })}
            isOpen={hasAccuratePointingDevice ? isOpen && inCart > 0 : inCart > 0}>
            <Button
                shadow="lg"
                my={{ base: 4, sm: 0 }}
                fontFamily="heading"
                leftIcon={<Icon as={FaShoppingCart} />}
                onClick={handleClick}
                colorScheme="yellow"
                onMouseEnter={onToggle}
                onMouseOut={onToggle}
                whiteSpace="normal"
                height="full"
                padding={3}>
                {f('addToCart')}
            </Button>
        </Tooltip>
    );
};

export default AddToCart;
