import PropTypes from 'prop-types';
import NextLink from 'next/link';

const Link = ({ href, alt, children }) => {
    return (
        <NextLink href={href}>
            <a alt={alt}>{children}</a>
        </NextLink>
    );
};

export default Link;

Link.propTypes = {
    href: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
