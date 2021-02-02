const theme = {
    useColorSchemeMediaQuery: true,
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
        body:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace'
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125
    },
    colors: {
        text: '#000000',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        primaryVariant: '#3700B3',
        secondary: '#03DAC5',
        secondaryVariant: '#018786',
        error: '#B0021E',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        onError: '#FFFFFF',
        modes: {
            dark: {
                text: '#FFFFFF',
                background: '#121212',
                surface: '#121212',
                primary: '#BB86FC',
                primaryVariant: '#3700B3',
                secondary: '#03DAC6',
                error: '#CF6679',
                onPrimary: '#000000',
                onSecondary: '#000000',
                onError: '#000000'
            }
        }
    },
    styles: {
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body'
        },
        h1: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 5
        },
        h2: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 4
        },
        h3: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 3
        },
        h4: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 2
        },
        h5: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 1
        },
        h6: {
            color: 'text',
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontSize: 0
        },
        p: {
            color: 'text',
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body'
        },
        a: {
            color: 'primary'
        },
        pre: {
            fontFamily: 'monospace',
            overflowX: 'auto',
            code: {
                color: 'inherit'
            }
        },
        code: {
            fontFamily: 'monospace',
            fontSize: 'inherit'
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0
        },
        th: {
            textAlign: 'left',
            borderBottomStyle: 'solid'
        },
        td: {
            textAlign: 'left',
            borderBottomStyle: 'solid'
        },
        img: {
            maxWidth: '100%'
        }
    },
    cards: {
        primary: {
            bg: 'surface',
            border: '1px solid',
            borderColor: 'surface',
            padding: 3,
            margin: 3,
            borderRadius: 4,
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
        },
        compact: {
            bg: 'surface',
            padding: 1,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'surface'
        }
    }
};

export default theme;
