import PropTypes from 'prop-types';
import { Box, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';

const NavLogo = ({ siteName, siteEmoji, siteEmojiLabel }) => {
    return (
        <LinkBox as={Flex}>
            <Box fontSize="xl" fontWeight="bold">
                <span role="img" aria-label={siteEmojiLabel}>
                    {siteEmoji}
                </span>
                <Link href="/" alt="Go to homepage" passHref>
                    <LinkOverlay>{siteName}</LinkOverlay>
                </Link>
            </Box>
        </LinkBox>
    );
};

export default NavLogo;

NavLogo.propTypes = {
    siteName: PropTypes.string.isRequired,
    siteEmoji: PropTypes.string.isRequired,
    siteEmojiLabel: PropTypes.string.isRequired
};
