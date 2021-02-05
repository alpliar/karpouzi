import PropTypes from 'prop-types';
import { Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

const HeaderLogo = ({ siteTitle }) => {
    return (
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            <NextLink href="/">
                <Link _hover={{ textDecor: 'none' }} alt="go to home">
                    <span role="img" aria-label="Watermelon">
                        🍉
                    </span>
                    {siteTitle}
                </Link>
            </NextLink>
        </Heading>
    );
};
export default HeaderLogo;

HeaderLogo.propTypes = {
    siteTitle: PropTypes.string.isRequired
};
