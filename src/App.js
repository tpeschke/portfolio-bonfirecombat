import React, { Component } from 'react';
import './reset.css'
import './App.css';

import NavBar from './NavBar'
import routes from './routes'

class App extends Component {
  constructor() {
    super()

    this.state = {
      fighters: ''
    }
  }

  render() {

    return (
      <div>
        <div className="header">
          <div className="logo">
            <h4>Combat Counter</h4>
          </div>
          <div className="headpic"></div>
        </div>
        <div className="appContent">
          <NavBar />

          <div className="border"></div>
          <div className="border"></div>

          {routes}
        </div>
      </div>
    );
  }
}

export default App;
