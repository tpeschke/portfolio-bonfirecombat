import React, { Component } from 'react'

import { connect } from 'react-redux'
import { OPENSETTINGS } from '../../ducks/reducer'

class LogDisplay extends Component {

    componentWillReceiveProps(next){
        next.page !== this.props.page && this.props.settings === true ? this.props.OPENSETTINGS() : null
    }

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
 
{/* <button id="settings"
                    onClick={this.props.OPENSETTINGS}
                >test</button> */}

            </div>
        )
    }
}

function mapStateToProps(state) {
    var { settings, page } = state
    return {
        settings,
        page
    }
}

let actionBuilder = {
    OPENSETTINGS
}

export default connect(mapStateToProps, actionBuilder)(LogDisplay)
