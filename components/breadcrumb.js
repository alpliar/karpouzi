import PropTypes from 'prop-types';
import { Breadcrumb as UiBreadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from './link';

const Breadcrumb = ({ entries }) => {
    return (
        <UiBreadcrumb fontSize="sm" separator={<ChevronRightIcon color="gray.500" />}>
            {entries.map((entry) => {
                return (
                    <BreadcrumbItem key={entry.slug} isCurrentPage={entry.isCurrentPage}>
                        {entry.isCurrentPage ? (
                            <span>{entry.text}</span>
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

Breadcrumb.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            isCurrentPage: PropTypes.bool.isRequired
        }).isRequired
    ).isRequired
};
