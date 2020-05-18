import * as React from "react";
import Head from "next/head";

const titlePrefix = "Damon Cai";

const Title: React.FunctionComponent<{ title?: string }> = ({ title }) => (
  <Head>
    <title>{title ? `${titlePrefix} | ${title}` : titlePrefix}</title>
  </Head>
);

export default Title;
