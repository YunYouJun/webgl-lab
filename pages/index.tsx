import Link from "next/link";
import { NextPage } from "next";

function getExamples() {
  return [
    { id: "bezier-curve", title: "Bézier curve" },
    { id: "model-view", title: "Moodel View" },
    { id: "hello-canvas", title: "Hello Canvas" }
  ];
}

const ExampleLink = ({ example }) => (
  <li key={example.id}>
    <Link href={`/${example.id}`}>
      <a>{example.title}</a>
    </Link>
  </li>
);

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <div className="App">
    <img src="/logo.svg" className="App-logo" alt="logo" />
    <h2>WebGL Lab</h2>
    <p>
      The lab space for learning WebGL. (deving...)
      <br />
      User Agent: {userAgent}
    </p>
    <ul>
      {getExamples().map(example => (
        <ExampleLink key={example.id} example={example} />
      ))}
    </ul>
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }

      .App {
        text-align: center;
      }

      .App-logo {
        height: 40vmin;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
