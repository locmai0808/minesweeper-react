import React, { Component } from 'react';
import Board from './components/Board';
import './App.css';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <div className='game'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <span>MineSweeper</span>
        </header>
        <Board height={8} width={8} mines={10} />
      </div>
    );
  }
}

export default App;
