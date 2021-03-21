import PropTypes from 'prop-types';
import { Button, Icon, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { sendToast } from '../utils/uiToast';

const AddToCart = ({ slug, quantity, inCart, cart, addToCart }) => {
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

AddToCart.propTypes = {
    slug: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    inCart: PropTypes.number,
    addToCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
};
