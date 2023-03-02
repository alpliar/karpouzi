import { extendTheme } from '@chakra-ui/theme-utils';
// import LinkOverlay from './components/linkOverlay';

// Global style overrides
import styles from './styles';

const theme = extendTheme({
    fonts: {
        body: "'PT Sans Caption', sans-serif",
        heading: "'Montserrat', sans-serif"
        // mono: "",
    },
    config: {
        initialColorMode: 'system'
    },
    styles,
    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em', // 1535px
        '3xl': '3840px' // 4k screen
    },
    components: {
        // LinkOverlay
    }
});

export default theme;
