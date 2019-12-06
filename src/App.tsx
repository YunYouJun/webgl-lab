import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The lab space for learning WebGL.
        </p>
        <h2>
          WebGL Lab
        </h2>
      </header>
    </div>
  );
}

export default App;
