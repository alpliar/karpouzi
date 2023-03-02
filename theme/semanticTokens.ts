import { ThemeOverride } from '@chakra-ui/react';

const semanticTokens: ThemeOverride['semanticTokens'] = {
    colors: {
        error: 'red.500',
        warning: {
            default: 'orange.300',
            _dark: 'orange.800'
        },
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
};

export default semanticTokens;
