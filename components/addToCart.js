import PropTypes from 'prop-types';
import { Button, Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { sendToast } from '../utils/uiToast';

const AddToCart = ({ slug, quantity, cart, addToCart }) => {
    const handleClick = () => {
        addToCart(slug, quantity, cart);
        sendToast('Item added to cart', slug, 'success');
    };

    return (
        <Button leftIcon={<Icon as={FaShoppingCart} />} onClick={handleClick}>
            Add to cart
        </Button>
    );
};

export default AddToCart;

AddToCart.propTypes = {
    slug: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    addToCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
};
