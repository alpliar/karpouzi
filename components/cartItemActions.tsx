import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Icon, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_QUANTITY_CART } from '../actions/shop';
import PopoverConfirm from './popoverConfirm';
import QuantitySelector from './quantitySelector';

interface IProps {
    slug: string;
    quantity: number;
}

const CartItemActions: React.FC<IProps> = ({ slug, quantity }) => {
    const dispatch = useDispatch();
    const [isOpenConfirmRemove, setIsOpenConfirmRemove] = useState(false);

    const handleQuantityUpdate = (newQuantity: number) => {
        newQuantity > 0
            ? dispatch({ type: UPDATE_QUANTITY_CART, slug: slug, newQuantity: newQuantity })
            : handleRemove();
    };

    const handleRemove = () => {
        dispatch({ type: REMOVE_FROM_CART, slug });
    };

    const handleCancel = () => {
        setIsOpenConfirmRemove(false);
    };

    return (
        <HStack spacing={2}>
            <QuantitySelector quantity={quantity} handleChange={handleQuantityUpdate} />
            <PopoverConfirm
                isOpen={isOpenConfirmRemove}
                onConfirm={handleRemove}
                onClose={handleCancel}
                trigger={
                    <IconButton
                        aria-label="Remove from cart"
                        size="xs"
                        icon={<Icon as={DeleteIcon} />}
                        colorScheme="teal"
                        onClick={() => {
                            setIsOpenConfirmRemove(!isOpenConfirmRemove);
                        }}
                    />
                }
                body={<span>Remove {slug} from cart ?</span>}
            />
        </HStack>
    );
};

export default CartItemActions;
