import Link from 'next/link';
import PropTypes from 'prop-types';

const UiHomeLogo = ({ siteTitle }) => {
    return (
        <Link href="/">
            <a className="tracking-tight text-green-500">
                <span className="align-middle text-5xl" role="img" aria-label="Yarn">
                    🧶
                </span>
                <span className="font-mono align-middle text-4xl font-extrabold">{siteTitle}</span>
            </a>
        </Link>
    );
};

export default UiHomeLogo;

UiHomeLogo.propTypes = {
    siteTitle: PropTypes.string.isRequired
};
