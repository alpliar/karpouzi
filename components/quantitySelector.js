import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const QuantitySelector = ({ quantity, minQuantity, maxQuantity, onChange }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const disableReduceQuantity = currentQuantity === minQuantity;
    const disableIncreaseQuantity = currentQuantity === maxQuantity;

    const buttonsSize = 'xs';

    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > minQuantity && newQuantity < maxQuantity) {
            setCurrentQuantity(newQuantity);
            onChange(event);
        }
    };
    const reduceQuantity = () => {
        if (currentQuantity > minQuantity) {
            setCurrentQuantity(currentQuantity - 1);
        }
    };
    const increaseQuantity = () => {
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity(currentQuantity + 1);
        }
    };

    return (
        <HStack spacing="1">
            <IconButton
                aria-label="Reduce quantity"
                size={buttonsSize}
                icon={<Icon as={MinusIcon} />}
                colorScheme="teal"
                onClick={reduceQuantity}
                disabled={disableReduceQuantity}
            />
            <Input
                type="number"
                size={buttonsSize}
                value={currentQuantity}
                maxLength={3}
                w="auto"
                maxW="3em"
                textAlign="center"
                onChange={handleChange}
            />
            <IconButton
                aria-label="Increase quantity"
                size={buttonsSize}
                icon={<Icon as={AddIcon} />}
                colorScheme="teal"
                onClick={increaseQuantity}
                disabled={disableIncreaseQuantity}
            />
        </HStack>
    );
};

export default QuantitySelector;

QuantitySelector.defaultProps = {
    quantity: 1,
    minQuantity: 0,
    maxQuantity: 99
};

QuantitySelector.propTypes = {
    quantity: PropTypes.number,
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number,
    onChange: PropTypes.func.isRequired
};
