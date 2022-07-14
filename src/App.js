import React, { Component } from 'react';

import TmpCanvas from "./SplinesCanvas";

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='app'>
          <TmpCanvas />
      </div>
    );
  }
}

export default App;
