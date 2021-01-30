import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import { PropTypes } from 'prop-types';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>{siteTitle}</title>
                <link rel="manifest" href="/manifest.json" />
                <link href="/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/icon-512x512.png"></link>

                <meta name="theme-color" content="#317EFB" />
            </Head>

            <main className="container">
                <section className=" mx-auto px-4 max-w-xl py-8">
                    <h2 className="text-xl tracking-tight font-extrabold text-indigo-600 sm:text-2xl md:text-3xl">
                        Blog
                    </h2>
                    <ul>
                        {allPostsData.map(({ id, date, title }) => (
                            <li className="py-4" key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a>
                                        <span className="text-xl tracking-tight font-bold">
                                            {title}
                                        </span>
                                        <br />
                                        {id}
                                        <br />
                                        {date}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </Layout>
    );
}

Home.propTypes = {
    allPostsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string
        })
    )
};
