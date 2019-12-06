import { Card, Col, Row } from "antd";
const { Meta } = Card;
import Head from "next/head";

export default function ModelView() {
  return (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Head>
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.js"
        ></script>
      </Head>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            hoverable
            cover={
              <model-viewer
                src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
                ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
                alt="A 3D model of an astronaut"
                auto-rotate
                background-color="#70BCD1"
                shadow-intensity="1"
                camera-controls
                interaction-prompt="auto"
                auto-rotate
                ar
                magic-leap
                style={{height: 600, outline: 'none'}}
              ></model-viewer>
            }
          >
            <Meta
              title="Astronaut by poly"
              description="Google Web Component <model-viewer>"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
