import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

export default function ThemeToggle() {
    const { toggleColorMode: toggleMode } = useColorMode();
    const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <IconButton
            icon={<ToggleIcon />}
            colorScheme="whiteAlpha"
            variant="solid"
            aria-label="Toggle Theme"
            onClick={toggleMode}
        />
    );
}
