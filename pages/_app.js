import PropTypes from 'prop-types';
import '../styles/global.scss';
import { ThemeProvider } from 'theme-ui';
// import theme from './theme';
import { future } from '@theme-ui/presets';

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={future}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
