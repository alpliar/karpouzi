import PropTypes from 'prop-types';
import { Badge, Box, Icon } from '@chakra-ui/react';
//import { EmailIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import NavButton from './navButton';

const NavCart = ({ cartCount }) => {
    const router = useRouter();
    const href = '/shop/cart/';

    const handleClick = (event) => {
        event.preventDefault();
        router.push(href);
    };

    return (
        <Box position="relative">
            <NavButton
                data-e2e="cartCTA"
                label="Go to cart"
                icon={<Icon as={FaShoppingCart} />}
                handleClick={handleClick}
            />
            {cartCount > 0 && (
                <Badge
                    borderRadius="full"
                    fontWeight="bold"
                    colorScheme="red"
                    position="absolute"
                    top="-1"
                    right="-1"
                    height="1.5em"
                    width={cartCount > 10 ? '2em' : '1.5em'}
                    textAlign="center"
                    variant="solid">
                    {cartCount}
                </Badge>
            )}
        </Box>
    );
};

export default NavCart;

NavCart.propTypes = {
    cartCount: PropTypes.number
};
