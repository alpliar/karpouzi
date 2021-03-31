import PropTypes from 'prop-types';
import { Box, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const NavLogo = ({ siteName, siteEmoji, siteEmojiLabel }) => {
    const { formatMessage } = useIntl();
    const f = (id) => formatMessage({ id });
    return (
        <LinkBox as={Flex}>
            <Box fontSize="xl" fontWeight="bold">
                <span role="img" aria-label={siteEmojiLabel}>
                    {siteEmoji}
                </span>
                <Link href="/" alt="Go to homepage" passHref>
                    <LinkOverlay>{f('commonSiteName')}</LinkOverlay>
                </Link>
            </Box>
        </LinkBox>
    );
};

export default NavLogo;

NavLogo.propTypes = {
    siteName: PropTypes.string,
    siteEmoji: PropTypes.string.isRequired,
    siteEmojiLabel: PropTypes.string.isRequired
};
