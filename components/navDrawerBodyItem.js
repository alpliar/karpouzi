import PropTypes from 'prop-types';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';

const NavDrawerBodyItem = ({ href, alt, text }) => {
    return (
        <LinkBox
            borderWidth="1px"
            borderRadius="lg"
            shadow="md"
            w="full"
            p="2"
            cursor="pointer"
            _hover={{
                bg: 'whiteAlpha.400'
            }}
            bg="whiteAlpha.300"
            color="white"
            textAlign="center">
            <Link href={href} alt={alt}>
                <LinkOverlay>{text}</LinkOverlay>
            </Link>
        </LinkBox>
    );
};

export default NavDrawerBodyItem;

NavDrawerBodyItem.propTypes = {
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
