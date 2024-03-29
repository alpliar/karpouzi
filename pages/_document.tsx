import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link
                        href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
                        rel="stylesheet"
                    /> */}
                </Head>
                <body
                    style={{
                        overflowY: 'scroll',
                        overflowX: 'hidden'
                    }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
