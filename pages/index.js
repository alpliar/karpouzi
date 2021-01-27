import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import SectionsCta from '../components/SectionsCta';
import utilStyles from '../styles/utils.module.scss';
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

            <main>
                <section className={utilStyles.headingMd}>
                    <p>Hi, i&apos;m me, nice to meet you !</p>
                    <p>
                        (This is a sample website - you’ll be building a site like this on{' '}
                        <Link href="/posts/first-post">our Next.js tutorial</Link>.)
                    </p>
                </section>
                <section>
                    <SectionsCta />
                </section>
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <ul className={utilStyles.list}>
                        {allPostsData.map(({ id, date, title }) => (
                            <li className={utilStyles.listItem} key={id}>
                                {title}
                                <br />
                                {id}
                                <br />
                                {date}
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
            id: PropTypes.number,
            date: PropTypes.string,
            title: PropTypes.string
        })
    )
};
