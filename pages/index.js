import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import LatestsPosts from '../components/LatestsPosts';
import { getSortedPostsData } from '../lib/posts';
import { PropTypes } from 'prop-types';
import Modal from '../components/Modal';
import { useState } from 'react';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

export default function Home({ allPostsData }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Layout home={true}>
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
                {/* <section>
                    <button
                        className="m-2 font-medium inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                            setShowModal(!showModal);
                        }}>
                        Show modal
                    </button>
                    {showModal && <Modal />}
                </section> */}
                <section className=" mx-auto px-4 max-w-xl py-8">
                    <LatestsPosts posts={allPostsData} />
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
