import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as UiLink } from '@chakra-ui/react';

const Link = ({ href, alt, children }) => {
    return (
        <NextLink href={href} passHref>
            <UiLink alt={alt}>{children}</UiLink>
        </NextLink>
    );
};

export default Link;

Link.propTypes = {
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
