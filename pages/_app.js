import PropTypes from 'prop-types';
import '../styles/global.scss';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider reseCSS>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
