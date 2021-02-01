import Link from 'next/link';
import PropTypes from 'prop-types';
import { Link as UiLink, Text } from 'theme-ui';

const UiHomeLogo = ({ siteTitle }) => {
    return (
        <Link href="/">
            <UiLink href="/" color="onPrimary">
                <Text
                    sx={{
                        fontSize: 5,
                        fontWeight: 'bold',
                        display: 'inline'
                    }}
                    color="onPrimary">
                    <span as="span" role="img" aria-label="Yarn">
                        🧶
                    </span>
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
