import { Badge, Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { MouseEventHandler } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import NavButton from './navButton';

interface IProps {
    cartCount: number;
}

const NavCart: React.FC<IProps> = ({ cartCount }) => {
    const router = useRouter();
    const href = '/shop/cart/';

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        router.push(href);
    };

    return (
        <Box position="relative">
            <NavButton
                e2e="cartCTA"
                label="Go to cart"
                icon={FaShoppingCart}
                handleClick={handleClick}
            />
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
    );
};

export default NavCart;
