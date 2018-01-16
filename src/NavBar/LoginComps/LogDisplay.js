import React, { Component } from 'react'

import { connect } from 'react-redux'
import { OPENSETTINGS } from '../../ducks/reducer' 

class LogDisplay extends Component {

    lock = () => {
       
        if (!this.props.userId) {
            return <div className='navInVis'></div>
        } else {
            return <div><p id='navItem'>Settings</p></div>
        }
    }

    render() {
        
            return (
                <div className="settingsOuter">
                   <button id="settings"
                    onClick={this.props.OPENSETTINGS}
                    >{this.lock()}</button>

<button id="settings"
                    onClick={this.props.OPENSETTINGS}
                    >TEST</button>
                </div>
            )
    }
}

function mapStateToProps(state) { 
    var {settings} = state
    return {  
        settings  } 
    }

let actionBuilder = {
    OPENSETTINGS
}

export default connect(mapStateToProps, actionBuilder)(LogDisplay)
