import Link from 'next/link';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <p>
          The lab space for learning WebGL. (deving...)
        </p>
        <h2>
          WebGL Lab
        </h2>
        <p>
          <Link href="/bezier-curve">
            <a>Bézier curve</a>
          </Link>
          <br />
          <Link href="/model-view">
            <a>Model View</a>
          </Link>
        </p>
      </header>
    </div>
  );
}

export default App;