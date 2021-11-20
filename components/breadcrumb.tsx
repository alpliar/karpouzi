import PropTypes from 'prop-types';
// import { Breadcrumb as UiBreadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from './link';
import { Breadcrumb as UiBreadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import { Text } from '@chakra-ui/layout';

const Breadcrumb = ({ entries }) => {
    return (
        <UiBreadcrumb fontSize="sm" separator={<ChevronRightIcon color="gray.500" />}>
            {entries.map((entry, index) => {
                return (
                    <BreadcrumbItem
                        key={`${entry.slug}-${index}`}
                        isCurrentPage={entry.isCurrentPage}>
                        {entry.isCurrentPage ? (
                            <Text>{entry.text}</Text>
                        ) : (
                            <Link href={entry.link} alt={entry.alt}>
                                {entry.text}
                            </Link>
                        )}
                    </BreadcrumbItem>
                );
            })}
        </UiBreadcrumb>
    );
};

export default Breadcrumb;

Breadcrumb.defaultProps = {
    isCurrentPage: false,
    link: null,
    alt: null
};

Breadcrumb.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string,
            alt: PropTypes.string,
            isCurrentPage: PropTypes.bool
        }).isRequired
    ).isRequired
};
