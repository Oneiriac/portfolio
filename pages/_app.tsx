import * as React from "react";
import { AppContext, AppProps } from "next/app";
import { PreviewProvider } from "../components/PreviewContext";
import "../styles.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { HeaderProps } from "../interfaces/props";
import { Client } from "../prismic-configuration";

const App: React.FunctionComponent<AppProps & HeaderProps> & {
  getInitialProps: (appCtx: AppContext) => any;
} = ({ Component, headerData, pageProps }) => {
  return (
    <PreviewProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Muli:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Layout headerData={headerData}>
        <Component {...pageProps} />
      </Layout>
    </PreviewProvider>
  );
};

/**
 * Load the header data from Prismic.
 * TODO: when Next.js supports getStaticProps in a custom app, change to this to re-enable Automatic Static Optimization
 */
App.getInitialProps = async () => {
  const client = Client();
  const header = await client.getSingle("header", {});
  return { headerData: header?.data ?? {} };
};

export default App;
