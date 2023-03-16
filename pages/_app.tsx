import { ChakraProvider } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import * as locales from '../content/locale';
import { wrapper } from '../redux/store';
import '../styles/global.scss';
import theme from '../theme';

const App = ({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps<{
    session: Session;
}>) => {
    const router = useRouter();
    const { locale, defaultLocale, pathname } = router;

    const localeCopy = locales[(locale as keyof typeof locales) || 'en'];

    const messagesvalues = {
        ...localeCopy[pathname as keyof typeof localeCopy],
        ...localeCopy['common']
    };

    return (
        <SessionProvider session={session}>
            <IntlProvider
                locale={locale || 'en'}
                defaultLocale={defaultLocale}
                messages={messagesvalues}>
                <ChakraProvider theme={theme} resetCSS>
                    <Component {...pageProps} />
                </ChakraProvider>
            </IntlProvider>
        </SessionProvider>
    );
};

export default wrapper.withRedux(App);
