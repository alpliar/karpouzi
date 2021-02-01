import Link from 'next/link';
import PropTypes from 'prop-types';
import { Link as UiLink, Text } from 'theme-ui';

const UiHomeLogo = ({ siteTitle }) => {
    return (
        <Link href="/">
            <UiLink color="onPrimary">
                <span as="span" role="img" aria-label="Yarn">
                    🧶
                </span>
                <Text
                    sx={{
                        fontSize: 3,
                        fontWeight: 'bold'
                    }}
                    color="onPrimary">
                    {siteTitle}
                </Text>
            </UiLink>
        </Link>
    );
};

export default UiHomeLogo;

UiHomeLogo.propTypes = {
    siteTitle: PropTypes.string.isRequired
};
