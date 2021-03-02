import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import QuantitySelector from './quantitySelector';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_QUANTITY_CART } from '../actions/shop';

const CartItemActions = ({ slug, quantity }) => {
    const dispatch = useDispatch();

    const handleQuantityUpdate = (newQuantity) => {
        newQuantity > 0
            ? dispatch({ type: UPDATE_QUANTITY_CART, slug, quantity: newQuantity })
            : handleRemove();
    };

    const handleRemove = () => {
        dispatch({ type: REMOVE_FROM_CART, slug });
    };

    return (
        <HStack spacing={2}>
            <QuantitySelector
                quantity={quantity}
                minQuantity={0}
                handleChange={handleQuantityUpdate}
            />
            <IconButton
                aria-label="Remove from cart"
                size="xs"
                icon={<Icon as={DeleteIcon} />}
                colorScheme="teal"
                onClick={handleRemove}
            />
        </HStack>
    );
};

export default CartItemActions;

CartItemActions.propTypes = {
    slug: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
};
