import React, { Component } from 'react'

import { connect } from 'react-redux'
import { OPENSETTINGS } from '../../ducks/reducer'

class LogDisplay extends Component {

    componentWillReceiveProps(next) {
        next.page !== this.props.page && this.props.settings === true ? this.props.OPENSETTINGS() : null
    }

    lock = () => {

        if (!this.props.userId) {
            return <div className='navInVis'></div>
        } else {
            return <div><p className={`navItem ${this.props.theme}-navItem`} id={`${this.props.theme}-settingItem`}>Settings</p></div>
        }
    }

    render() {

        return (
            <div className="settingsOuter">
                <button className={`settings ${this.props.theme}-setting`}
                    onClick={this.props.OPENSETTINGS}
                >{this.lock()}</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { settings, page, theme } = state
    return {
        settings,
        page,
        theme
    }
}

let actionBuilder = {
    OPENSETTINGS
}

export default connect(mapStateToProps, actionBuilder)(LogDisplay)
