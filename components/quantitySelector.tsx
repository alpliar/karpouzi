import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton, Input } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

interface IProps {
    quantity: number;
    minQuantity?: number;
    maxQuantity?: number;
    handleChange: (arg: number) => void;
}

const QuantitySelector: React.FC<IProps> = ({
    quantity,
    minQuantity = 1,
    maxQuantity = 99,
    handleChange
}) => {
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

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
