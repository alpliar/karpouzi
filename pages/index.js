import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import SectionsCta from '../components/SectionsCta'
import utilStyles from '../styles/utils.module.scss'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet='utf-8' /> 
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' /> 
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5' /> 
        <meta name='description' content='Description' /> 
        <meta name='keywords' content='Keywords' /> 
        <title>{siteTitle}</title> 
        <link rel="manifest" href="/manifest.json" />
        <link href='/icon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/icon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel="apple-touch-icon" href="/icon-512x512.png"></link>

        <meta name="theme-color" content="#317EFB"/>
      </Head>

      <main>
        <section className={utilStyles.headingMd}>
          <p>Hi, i'm me, nice to meet you !</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
        <section>
          <SectionsCta />
        </section>
      </main>
    </Layout>
  )
}
