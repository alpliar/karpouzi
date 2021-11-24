// theme/index.js
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em', // 1535px
    '3xl': '3840px' // 4k screen
});

// Global style overrides
import styles from './styles';

// Foundational style overrides
// import borders from './foundations/borders';

// Component style overrides
// import Button from './components/button';

const overrides = {
    // fonts: {
    //     body: 'monospace'
    // },

    // styles: {
    //     global: {
    //         body: {
    //             bg: 'red'
    //         }
    //     }
    // }
    styles,
    // borders,
    // Other foundational style overrides go here
    // components: {
    // Button
    // Other components go here
    // }
    breakpoints
};

export default extendTheme(overrides);
