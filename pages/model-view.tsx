import Script from 'next/script'
import Layout from '../components/Layout'

export default function ModelView() {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      />
      <Layout title="Model View">
        <h1>Model View</h1>
        <div className="text-center shadow">
          {/* @ts-ignore */}
          <model-viewer
            src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
            ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
            alt="A 3D model of an astronaut"
            auto-rotate
            background-color="#70BCD1"
            shadow-intensity="1"
            camera-controls
            interaction-prompt="auto"
            ar
            magic-leap
            style={{ height: 600, outline: 'none', margin: 'auto' }}
          />
        </div>
      </Layout>
    </>
  )
}
