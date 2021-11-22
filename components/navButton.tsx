import PropTypes from 'prop-types';
import { Button, IconButton, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';

const NavButton = ({ icon, label, handleClick, isPrimary, compact, e2e }) => {
    const lightColorScheme = isPrimary ? 'red' : 'white';
    const darkColorScheme = isPrimary ? 'red' : 'white';

    const colorScheme = useColorModeValue(lightColorScheme, darkColorScheme);
    const variant = isPrimary ? 'outline' : 'solid';
    const lightColor = 'gray.800';
    const darkColor = 'white';
    const color = useColorModeValue(lightColor, darkColor);
    // useBreakPoint value is not available instantly, need a 'sm' fallback in order to prevent buttons resize on load
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'sm';

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
                data-e2e={e2e}
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
                size={size}
                data-e2e={e2e}>
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
    compact: PropTypes.bool,
    e2e: PropTypes.string
};

NavButton.defaultProps = {
    isPrimary: false,
    compact: true,
    e2e: null
};
