import React, { Component } from 'react';
import './reset.css'
import './App.css';

import { connect } from 'react-redux'

import NavBar from './NavBar/NavBar'
import Routes from './routes'
import Statuses from './BattleField/MainFieldComp/Statuses'
import Settings from './NavBar/LoginComps/Settings'

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
        <div className="appContent" id="container" style={this.state.style}>

      <div className="NavContainer">
          <NavBar />

          <div className="settingsBannerOut">
            <Settings
              user={this.props.user}
              settings={this.props.settings} />
          </div>
        </div>

          <div className="border"></div>
          <div className="border"></div>

          <Routes setHeight={this.setHeight} />



        </div>

        <div className="StatusOver">
          <Statuses />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var { user, settings } = state

  return {
    user,
    settings
  }
}

export default connect(mapStateToProps, {})(App)
