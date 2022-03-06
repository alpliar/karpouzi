import { Button, Icon, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { ICartItem } from '../container/addToCart';
import { sendToast } from '../utils/uiToast';
interface IAddToCartProps {
    slug: string;
    quantity: number;
    inCart: number;
    addToCart: (slug: string, quantity: number, cart: Array<ICartItem>) => void;
    cart: Array<ICartItem>;
}

const AddToCart: React.FC<IAddToCartProps> = ({ slug, quantity, inCart, addToCart, cart }) => {
    const handleClick = () => {
        addToCart(slug, quantity, cart);
        sendToast('Item added to cart', slug, 'success');
    };

    return (
        <Tooltip
            hasArrow
            label={`Already ${inCart} in cart !`}
            placement={useBreakpointValue({ base: 'bottom', md: 'right' })}
            isOpen={inCart > 0}>
            <Button leftIcon={<Icon as={FaShoppingCart} />} onClick={handleClick}>
                Add to cart
            </Button>
        </Tooltip>
    );
};

export default AddToCart;
