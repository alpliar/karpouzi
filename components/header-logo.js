import PropTypes from 'prop-types';
import { Heading } from '@chakra-ui/react';
import Link from '../components/link';

const HeaderLogo = ({ siteTitle }) => {
    return (
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            <Link href="/" alt="go to home">
                <span role="img" aria-label="Watermelon">
                    🍉
                </span>
                {siteTitle}
            </Link>
        </Heading>
    );
};
export default HeaderLogo;

HeaderLogo.propTypes = {
    siteTitle: PropTypes.string.isRequired
};
