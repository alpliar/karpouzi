import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../actions/shop';

const AddToCart = ({ slug, quantity = 1 }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        //console.log(slug);
        dispatch({ type: ADD_TO_CART, payload: slug });
    };

    return <Button onClick={handleClick}>Add to cart</Button>;
};

export default AddToCart;

AddToCart.propTypes = {
    slug: PropTypes.string.isRequired,
    quantity: PropTypes.number
};
