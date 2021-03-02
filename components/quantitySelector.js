import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const QuantitySelector = ({ quantity, minQuantity, maxQuantity, handleChange }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const disableReduceQuantity = currentQuantity === minQuantity;
    const disableIncreaseQuantity = currentQuantity === maxQuantity;

    const buttonsSize = 'xs';

    const handleReduceQuantity = () => {
        if (currentQuantity > minQuantity) {
            setCurrentQuantity(currentQuantity - 1);
            quantity -= 1;
            handleChange(quantity);
        }
    };
    const handleIncreaseQuantity = () => {
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity(currentQuantity + 1);
            quantity += 1;
            handleChange(quantity);
        }
    };

    return (
        <HStack spacing="1">
            <IconButton
                aria-label="Reduce quantity"
                size={buttonsSize}
                icon={<Icon as={MinusIcon} />}
                colorScheme="teal"
                onClick={handleReduceQuantity}
                disabled={disableReduceQuantity}
            />
            <Input
                type="number"
                size={buttonsSize}
                value={quantity}
                maxLength={3}
                w="auto"
                maxW="3em"
                textAlign="center"
            />
            <IconButton
                aria-label="Increase quantity"
                size={buttonsSize}
                icon={<Icon as={AddIcon} />}
                colorScheme="teal"
                onClick={handleIncreaseQuantity}
                disabled={disableIncreaseQuantity}
            />
        </HStack>
    );
};

export default QuantitySelector;

QuantitySelector.defaultProps = {
    quantity: 1,
    minQuantity: 1,
    maxQuantity: 99
};

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number
};
