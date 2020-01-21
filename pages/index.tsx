import Layout from "../components/Layout";
import { NextPage } from "next";

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <Layout title="Index">
    <h2>WebGL Lab</h2>
    <p>
      The lab space for learning WebGL. (deving...)
      <br />
      User Agent: {userAgent}
    </p>
  </Layout>
);

// Home.getInitialProps = async ({ req }) => {
//   const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
//   return { userAgent };
// };

export default Home;
