import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import QuantitySelector from './quantitySelector';

const CartItemActions = ({ quantity }) => {
    const handleChange = (event) => {
        console.log('action:', event.target.value);
    };

    return (
        <HStack spacing={2}>
            <QuantitySelector onChange={handleChange} quantity={quantity} />
            <IconButton
                aria-label="Search database"
                size="xs"
                icon={<Icon as={DeleteIcon} />}
                colorScheme="teal"
            />
        </HStack>
    );
};

export default CartItemActions;

CartItemActions.propTypes = {
    quantity: PropTypes.number.isRequired
};
