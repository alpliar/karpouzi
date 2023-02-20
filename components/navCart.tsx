import { Badge, Box, Center, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import Link from './link';
import Popover from './Popover';

interface IProps {
    cartCount: number;
}

const NavCart: React.FC<IProps> = ({ cartCount }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);

    return (
        <Popover
            trigger={
                <Box position="relative">
                    {/* <NavButton
                        e2e="cartCTA"
                        label="Go to cart"
                        icon={FaShoppingCart}
                        handleClick={handleClick}
                    /> */}
                    <Link
                        href="/shop/cart"
                        color="currentColor"
                        // onClick={(event) => event.preventDefault()}
                        asButton
                        buttonProps={{
                            variant: 'ghost',
                            leftIcon: <Icon boxSize={5} as={FaShoppingCart} />
                        }}>
                        Cart
                    </Link>
                    {cartCount > 0 && (
                        <Center
                            as={Badge}
                            height={{ base: '4' }}
                            width={{ base: '4' }}
                            position="absolute"
                            top="0"
                            right="0"
                            bgColor="red"
                            borderRadius="full"
                            fontSize={{ base: '0.7rem' }}
                            variant="solid">
                            {cartCount}
                        </Center>
                    )}
                </Box>
            }>
            {cartCount > 0 ? <Text>{f('accessCart')}</Text> : <Text>{f('cartIsEmpty')}</Text>}
        </Popover>
    );
};

export default NavCart;
