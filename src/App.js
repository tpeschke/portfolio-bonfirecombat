import React, { Component } from 'react';
import './reset.css'
import './App.css';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import NavBar from './NavBar/NavBar'
import Routes from './routes'
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
              <div className="settingsBannerOut">
                <Settings
                  user={this.props.user}
                  settings={this.props.settings}
                  TOGGLEPLAYERVIEW={this.props.TOGGLEPLAYERVIEW}
                  playerview={this.props.playerview}
                  theme={this.props.theme} />
              </div>
            </div>
            <div className="headpic"></div>
          </div>
          <div className={`appContent ${this.props.theme}-appContent`} id="container" style={this.state.style}>

            <div className="NavContainer">
              <NavBar redirect={this.props.history.push}/>
            </div>

            <div className={`${this.props.theme}-border`}></div>
            <div className={`${this.props.theme}-border`}></div>

            <Routes setHeight={this.setHeight} />
          </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  var { user, settings, theme } = state

  return {
    user,
    settings,
    theme
  }
}

export default withRouter(connect(mapStateToProps)(App))
