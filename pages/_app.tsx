import * as React from "react";
import { AppContext, AppProps } from "next/app";
import { PreviewProvider } from "../components/PreviewContext";
import "../styles.css";
import Layout from "../components/Layout";
import { HeaderProps } from "../interfaces/props";
import { Client } from "../prismic-configuration";

const App: React.FunctionComponent<AppProps & HeaderProps> & {
  getInitialProps: (appCtx: AppContext) => any;
} = ({ Component, headerData, pageProps }) => {
  return (
    <PreviewProvider>
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
