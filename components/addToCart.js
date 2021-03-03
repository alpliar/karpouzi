import PropTypes from 'prop-types';
import { Button, Icon, useToast } from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
// import { ADD_TO_CART } from '../actions/shop';
import { FaShoppingCart } from 'react-icons/fa';

const AddToCart = ({ slug, quantity, cart, addToCart }) => {
    // const dispatch = useDispatch();
    const toast = useToast();

    const handleClick = () => {
        addToCart(slug, quantity, cart);
        toast({
            title: `Item added to cart`,
            description: `${slug}`,
            status: 'success',
            position: 'bottom-right',
            duration: 1500,
            isClosable: true
        });
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
