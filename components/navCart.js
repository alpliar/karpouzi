import PropTypes from 'prop-types';
import { Badge, Box, Icon, IconButton } from '@chakra-ui/react';
//import { EmailIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';

const NavCart = ({ cartCount }) => {
    const router = useRouter();
    const href = '/shop/cart/';

    const handleClick = (event) => {
        event.preventDefault();
        router.push(href);
    };

    return (
        <Box position="relative">
            <IconButton
                aria-label="Go to cart"
                colorScheme="whiteAlpha"
                variant="solid"
                icon={<Icon as={FaShoppingCart} />}
                onClick={handleClick}
            />
            <Badge
                borderRadius="full"
                fontWeight="bold"
                colorScheme="red"
                position="absolute"
                top="-1"
                right="-1"
                height="1.5em"
                width="1.5em"
                textAlign="center"
                variant="solid">
                {cartCount && <span>{cartCount > 0 ? cartCount : '-'}</span>}
            </Badge>
        </Box>
    );
};

export default NavCart;

NavCart.propTypes = {
    cartCount: PropTypes.number
};
