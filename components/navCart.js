import PropTypes from 'prop-types';
import { Badge, Box, IconButton } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
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
            <IconButton aria-label="Go to cart" icon={<EmailIcon />} onClick={handleClick} />
            <Badge borderRadius="full" position="absolute" top="-1" right="-1">
                {cartCount && <span>{cartCount}</span>}
            </Badge>
        </Box>
    );
};

export default NavCart;

NavCart.propTypes = {
    cartCount: PropTypes.number
};
