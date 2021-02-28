import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import NavButton from './navButton';

const NavThemeToggle = () => {
    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return <NavButton icon={<ToggleIcon />} ariaLabel={'Toggle theme'} handleClick={toggleMode} />;
};

export default NavThemeToggle;
