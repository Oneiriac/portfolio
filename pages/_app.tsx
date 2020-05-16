import { AppProps } from "next/app";
import * as React from "react";
import { PreviewProvider } from "../components/PreviewContext";
import "../styles.css";
import Head from "next/head";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <PreviewProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </PreviewProvider>
  );
};

export default MyApp;