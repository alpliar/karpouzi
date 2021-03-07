import PropTypes from 'prop-types';
import { Button, IconButton, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';

const NavButton = ({ icon, label, handleClick, isPrimary, compact }) => {
    const lightColorScheme = isPrimary ? 'whiteAlpha' : 'teal';
    const darkColorScheme = isPrimary ? 'teal' : 'whiteAlpha';

    const colorScheme = useColorModeValue(lightColorScheme, darkColorScheme);
    const variant = isPrimary ? 'outline' : 'solid';
    const lightColor = 'white';
    const darkColor = 'white';
    const color = useColorModeValue(lightColor, darkColor);
    // useBreakPoint value is not available instantly, need a 'sm' fallback in order to prevent buttons resize on load
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'md';

    if (compact === true) {
        return (
            <IconButton
                aria-label={label}
                color={color}
                icon={icon}
                onClick={handleClick}
                colorScheme={colorScheme}
                variant={variant}
                size={size}
            />
        );
    } else {
        return (
            <Button
                aria-label={label}
                color={color}
                leftIcon={icon}
                onClick={handleClick}
                colorScheme={colorScheme}
                variant={variant}
                size={size}>
                {label}
            </Button>
        );
    }
};

export default NavButton;

NavButton.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    isPrimary: PropTypes.bool,
    compact: PropTypes.bool
};

NavButton.defaultProps = {
    compact: true
};
