import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function Custom404() {
    return (
        <Layout>
            <Head>{siteTitle} - 404</Head>

            <div className="md:container md:mx-auto pb-32 px-4 text-center text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <h1 className=" text-gray-900">404</h1>
                <span className="block text-indigo-600 xl:inline">Page not found</span>
            </div>
        </Layout>
    );
}
