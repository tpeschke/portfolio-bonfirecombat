import React, { Component } from 'react';
import './reset.css'
import './App.css';
import PageTransition from 'react-router-page-transition'

import NavBar from './NavBar/NavBar'
import Routes from './routes'
import Statusest from './BattleField/MainFieldComp/Statuses'
import Statuses from './BattleField/MainFieldComp/Statuses';

class App extends Component {
  constructor() {
    super()

    this.state = {
      fighters: '',
      style: {
        height: '0px'
      }
    }
  }

  setHeight = (height) => {
    this.setState({
      style: {
        height: height
      }
    })
  }

  render() {

    return (
      <div className="slideDown">
        <div className="header">
          <div className="logo">
            <h4>Combat Counter</h4>
          </div>
          <div className="headpic"></div>
        </div>
        <div className="appContent" style={this.state.style}>

          <NavBar />

          <div className="border"></div>
          <div className="border"></div>

          <Routes setHeight={this.setHeight}/>

        </div>
        <div className="StatusOver">
          <Statuses />
        </div>
      </div>
    );
  }
}

export default App;
