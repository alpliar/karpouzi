import { ChakraProvider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { wrapper } from '../store';
import '../styles/global.scss';
import { IntlProvider } from 'react-intl';
import * as locales from '../content/locale';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const { locale, defaultLocale, pathname } = router;
    const localeCopy = locales[locale || defaultLocale];
    const messages = localeCopy[pathname];
    console.log(messages);


    return (
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
            <ChakraProvider resetCSS>
                <Component {...pageProps} />
            </ChakraProvider>
        </IntlProvider>
    );
};

export default wrapper.withRedux(App);

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
