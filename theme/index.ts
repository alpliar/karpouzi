// theme/index.js
import { extendTheme, ThemeOverride } from '@chakra-ui/react';
import { ThemeConfig } from '@chakra-ui/theme';
import { createBreakpoints } from '@chakra-ui/theme-tools';
// Global style overrides
import styles from './styles';

const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em', // 1535px
    '3xl': '3840px' // 4k screen
});

// Foundational style overrides
// import borders from './foundations/borders';

// Component style overrides
// import Button from './components/button';
const config: ThemeConfig = {
    initialColorMode: 'system'
    // initialColorMode: 'dark'
    // useSystemColorMode: true
};

const fonts: ThemeOverride['fonts'] = {
    body: null,
    heading: null,
    mono: null
};

// const overrides: ThemeOverride = {
// Gives error : Type instantiation is excessively deep and possibly infinite.
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42829
const overrides: any = {
    fonts,
    config,
    styles,
    breakpoints
};

export default extendTheme(overrides);
