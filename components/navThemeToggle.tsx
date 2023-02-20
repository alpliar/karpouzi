import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import NavButton from './navButton';
import Popover from './Popover';

interface IProps {
    compact?: boolean;
}

const NavThemeToggle: React.FC<IProps> = ({ compact = true }) => {
    const { colorMode } = useColorMode();
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <Popover
            trigger={
                <Box>
                    <NavButton
                        e2e="themeCTA"
                        icon={ToggleIcon}
                        label={f('theme')}
                        compact={compact}
                        handleClick={toggleMode}
                    />
                </Box>
            }>
            <>
                <Text>
                    {f('switchToThemeName', {
                        name: f(colorMode === 'light' ? 'darkTheme' : 'lightTheme')
                    })}
                </Text>
            </>
        </Popover>
    );
};

export default NavThemeToggle;
