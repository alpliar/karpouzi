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
    },
    semanticTokens: {
        colors: {
            error: 'red.500',
            bodyBg: {
                default: 'white',
                _dark: 'gray.800'
            },
            surface: {
                default: 'white',
                _dark: 'gray.900'
            },
            textOnSurface: {
                default: 'black',
                _dark: 'white'
            },
            paper: {
                default: 'white',
                _dark: 'black'
            },
            helperText: {
                default: 'blackAlpha.600',
                _dark: 'whiteAlpha.600'
            }
        }
    }
});

export default theme;
