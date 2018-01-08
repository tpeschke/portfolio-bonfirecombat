import React, { Component } from 'react';
import './reset.css'
import './App.css';

import NavBar from './NavBar/NavBar'
import routes from './routes'
import Statusest from './BattleField/MainFieldComp/Statuses'
import Statuses from './BattleField/MainFieldComp/Statuses';

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
        <div className="StatusOver">
        <Statuses />
        </div>
      </div>
    );
  }
}

export default App;
