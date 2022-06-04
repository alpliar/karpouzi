import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { NextRouter, useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import * as locales from '../content/locale';
import { wrapper } from '../store';
import '../styles/global.scss';
import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
    const router: NextRouter = useRouter();
    const { locale, defaultLocale, pathname } = router;
    const localeCopy = locales[locale as keyof typeof locales];
    const messages: Record<string, string> = {
        ...localeCopy[pathname as keyof typeof localeCopy],
        ...localeCopy['common']
    };

    return (
        <IntlProvider locale={locale || 'en'} defaultLocale={defaultLocale} messages={messages}>
            <ChakraProvider theme={theme} resetCSS>
                <Component {...pageProps} />
            </ChakraProvider>
        </IntlProvider>
    );
};

export default wrapper.withRedux(App);
