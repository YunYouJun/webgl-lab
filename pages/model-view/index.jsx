import "@google/model-viewer/dist/model-viewer";

export default function ModelView() {
  return (
    <div>
      <model-viewer
        src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
        auto-rotate
        camera-controls
        background-color="#000000"
      ></model-viewer>
    </div>
  );
}
