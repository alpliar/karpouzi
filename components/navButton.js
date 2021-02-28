import PropTypes from 'prop-types';
import { Button, IconButton, useColorModeValue } from '@chakra-ui/react';

const NavButton = ({ icon, ariaLabel, handleClick }) => {
    // const colorScheme = 'blackAlpha';
    const colorScheme = useColorModeValue('teal', 'blackAlpha');

    const variant = 'solid';

    if (icon) {
        return (
            <IconButton
                aria-label={ariaLabel}
                color="white"
                icon={icon}
                onClick={handleClick}
                colorScheme={colorScheme}
                variant={variant}
            />
        );
    } else {
        return (
            <Button
                aria-label={ariaLabel}
                onClick={handleClick}
                colorScheme={colorScheme}
                variant={variant}
            />
        );
    }
};

export default NavButton;

NavButton.propTypes = {
    icon: PropTypes.node,
    ariaLabel: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};
