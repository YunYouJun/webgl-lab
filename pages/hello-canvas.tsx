import Layout from "../components/Layout";
import Paper from "@material-ui/core/Paper";

const HelloCanvas: React.FunctionComponent = () => (
  <Layout title="Hello Canvas">
    <Paper>
      <canvas width="400" height="400"></canvas>
    </Paper>
  </Layout>
);

export default HelloCanvas;
