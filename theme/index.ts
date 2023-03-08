import { extendTheme } from '@chakra-ui/theme-utils';
import breakpoints from './breakpoints';
import Button from './components/Button';
import fonts from './fonts';
import fontSizes from './fontSizes';
import semanticTokens from './semanticTokens';

// Global style overrides
import styles from './styles';

const theme = extendTheme({
    fonts,
    fontSizes,
    config: {
        initialColorMode: 'system'
    },
    styles,
    breakpoints,
    components: {
        // LinkOverlay
        Button
    },
    semanticTokens
});

export default theme;
