import PropTypes from 'prop-types';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import NavButton from './navButton';

const NavThemeToggle = ({ compact }) => {
    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <NavButton
            e2e="themeCTA"
            icon={<ToggleIcon />}
            label={'Toggle theme'}
            compact={compact}
            handleClick={toggleMode}
        />
    );
};

export default NavThemeToggle;

NavThemeToggle.propTypes = {
    compact: PropTypes.bool
};

NavThemeToggle.defaultProps = {
    compact: true
};
