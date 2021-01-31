// example theme.js
export default {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace'
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125
    },
    letterSpacings: {
        body: 'normal',
        caps: '0.2em'
    },
    useColorSchemeMediaQuery: true,
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#E45C34',
        secondary: '',
        modes: {
            dark: {
                text: '#fff',
                background: '#121212',
                primary: '#F4AE95'
            }
        }
    },
    buttons: {
        primary: {
            color: 'background',
            bg: 'primary',
            '&:hover': {
                bg: 'text'
            }
        },
        secondary: {
            color: 'background',
            bg: 'secondary'
        }
    }
};
