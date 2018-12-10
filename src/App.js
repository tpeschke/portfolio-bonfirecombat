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
    let {theme, user, settings, TOGGLEPLAYERVIEW, playerview, history} = this.props

    return (
        <div className="slideDown">
          <div className="header">
            <div className={`logo ${theme}-logo`}>
              <h4 className={`subtitle ${theme}-subtitle`}>Combat Counter</h4>
              <div className="settingsBannerOut">
                <Settings
                  user={user}
                  settings={settings}
                  TOGGLEPLAYERVIEW={TOGGLEPLAYERVIEW}
                  playerview={playerview}
                  theme={theme} />
              </div>
            </div>
            <div className={`headpic ${theme}-headpic`}></div>
          </div>
          <div className={`appContent ${theme}-appContent`} id="container" style={this.state.style}>

            <div className="NavContainer">
              <NavBar redirect={history.push}/>
            </div>

            <div className={`${theme}-border`}></div>
            <div className={`${theme}-border`}></div>

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
