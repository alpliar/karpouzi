import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import NavButton from './navButton';
import { useIntl } from 'react-intl';

interface IProps {
    compact?: boolean;
}

const NavThemeToggle: React.FC<IProps> = ({ compact = true }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <NavButton
            e2e="themeCTA"
            icon={ToggleIcon}
            label={f('theme')}
            compact={compact}
            handleClick={toggleMode}
        />
    );
};

export default NavThemeToggle;
