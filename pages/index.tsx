import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home">
    <h1>Hey there—I'm Damon 👋</h1>
    <p>
      Software engineer,
      <br />
      Linguistics student
    </p>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
