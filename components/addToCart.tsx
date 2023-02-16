import { Button, Icon, Tooltip, useBreakpointValue } from '@chakra-ui/react';
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

    const handleClick = () => {
        addToCart(slug, quantity, cart);
        sendToast(f('addedToCart'), name, 'success');
    };

    return (
        <Tooltip
            hasArrow
            label={f('noAlreadyInCart', { count: inCart })}
            placement={useBreakpointValue({ base: 'bottom', md: 'right' })}
            isOpen={inCart > 0}>
            <Button
                fontFamily="heading"
                leftIcon={<Icon as={FaShoppingCart} />}
                onClick={handleClick}
                colorScheme="green">
                {f('addToCart')}
            </Button>
        </Tooltip>
    );
};

export default AddToCart;
