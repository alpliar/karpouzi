import PropTypes from 'prop-types';
import { Button, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../actions/shop';

const AddToCart = ({ slug, quantity = 1 }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const handleClick = () => {
        dispatch({ type: ADD_TO_CART, payload: slug });
        toast({
            title: `Item added to cart`,
            description: `${slug}`,
            status: 'success',
            position: 'bottom-right',
            duration: 2000,
            isClosable: true
        });
    };

    return <Button onClick={handleClick}>Add to cart</Button>;
};

export default AddToCart;

AddToCart.propTypes = {
    slug: PropTypes.string.isRequired,
    quantity: PropTypes.number
};
