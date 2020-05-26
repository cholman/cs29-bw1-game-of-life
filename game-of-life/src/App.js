import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
        <div>
          <div className="canvas">Canvas</div>
          <div className="rules">
            <h2>The Rules</h2>
            <ul>
              <li>For a space that is 'populated':</li>
              <li>Each cell with one or no neighbors dies, as if by solitude.</li>
              <li>Each cell with four or more neighbors dies, as if by overpopulation.</li>
              <li>Each cell with two or three neighbors survives.</li>
              <li>For a space that is 'empty' or 'unpopulated'</li>
              <li>Each cell with three neighbors becomes populated.</li>
            </ul>
          </div>
        </div>
        <div>About</div>
      </header>
    </div>
  );
}

export default App;
