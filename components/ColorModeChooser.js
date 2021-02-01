import { useColorMode } from 'theme-ui';
import { Button } from 'theme-ui';

const ColorModeChooser = () => {
    const [colorMode, setColorMode] = useColorMode();
    const handleClick = () => {
        setColorMode(colorMode === 'default' ? 'dark' : 'default');
    };

    return (
        <header>
            <Button onClick={handleClick} bg="primary" color="onPrimary">
                Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
            </Button>
        </header>
    );
};

export default ColorModeChooser;
