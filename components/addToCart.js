import PropTypes from 'prop-types';
import { Button, Icon, useToast } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { createToast } from '../utils/uiToast';

const AddToCart = ({ slug, quantity, cart, addToCart }) => {
    const toast = useToast();

    const handleClick = () => {
        addToCart(slug, quantity, cart);
        toast(createToast('Item added to cart', slug, 'success'));
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
