import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import * as locales from '../content/locale';
import { wrapper } from '../store';
import '../styles/global.scss';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const { locale, defaultLocale, pathname } = router;
    const localeCopy: string = locales[locale || defaultLocale];
    const messages: Record<string, string> = { ...localeCopy[pathname], ...localeCopy['common'] };

    return (
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
            <ChakraProvider theme={theme} resetCSS>
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
