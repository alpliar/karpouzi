import PropTypes from 'prop-types';
import '../styles/global.scss';
import { ThemeProvider } from 'theme-ui';
import theme from '../styles/theme';
//import { tailwind as theme } from '@theme-ui/presets';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
