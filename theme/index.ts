import { extendTheme } from '@chakra-ui/theme-utils';
import breakpoints from './breakpoints';
import fonts from './fonts';
import semanticTokens from './semanticTokens';

// Global style overrides
import styles from './styles';

const theme = extendTheme({
    fonts,
    config: {
        initialColorMode: 'system'
    },
    styles,
    breakpoints,
    components: {
        // LinkOverlay
    },
    semanticTokens
});

export default theme;
