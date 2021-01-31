import PropTypes from 'prop-types';

const UiTitle = ({ children, rank }) => {
    const Tag = rank > 6 ? 'h6' : `h${rank}`;
    return (
        <Tag className="text-2xl font-extrabold text-indigo-600 dark:text-white sm:text-2xl md:text-3xl">
            {children}
        </Tag>
    );
};

export default UiTitle;

UiTitle.propTypes = {
    children: PropTypes.node.isRequired,
    rank: PropTypes.oneOf(1, 2, 3, 4, 5, 6)
};
