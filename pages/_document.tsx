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
                    <link
                        href="https://fonts.googleapis.com/css2?family=PT+Sans+Caption&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body
                    style={{
                        overflowY: 'scroll'
                    }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
