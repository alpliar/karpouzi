import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import NavButton from './navButton';

interface IProps {
    compact?: boolean;
}

const NavThemeToggle: React.FC<IProps> = ({ compact = true }) => {
    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <NavButton
            e2e="themeCTA"
            icon={ToggleIcon}
            label={'Toggle theme'}
            compact={compact}
            handleClick={toggleMode}
        />
    );
};

export default NavThemeToggle;
