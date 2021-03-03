import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const QuantitySelector = ({ quantity, minQuantity, maxQuantity, handleChange }) => {
    
    const disableReduceQuantity = quantity == minQuantity;
    const disableIncreaseQuantity = quantity == maxQuantity;

    const buttonsSize = 'xs';

    const handleReduceQuantity = () => {
        const newQuantity = quantity - 1;
        handleChange(newQuantity);
    };
    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        handleChange(newQuantity);
    };

    const handleInputChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity && !(newQuantity > maxQuantity || newQuantity < minQuantity)) {
            handleChange(newQuantity);
        } else {
            event.preventDefault();
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
                onChange={handleInputChange}
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
    minQuantity: 1,
    maxQuantity: 99
};

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number
};
