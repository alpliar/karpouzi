import PropTypes from 'prop-types';
import { wrapper } from '../reducer';

import '../styles/global.scss';
import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Component, pageProps }) => (
    <ChakraProvider resetCSS>
        <Component {...pageProps} />
    </ChakraProvider>
);

export default wrapper.withRedux(App);

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
