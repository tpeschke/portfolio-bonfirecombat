import React, { Component } from 'react'

export default class PlayerviewToggle extends Component {

    render() {
        var {user, playerview } = this.props

        if (this.props.hash) {
            return (
                <div className="inTooltip">
                    <div className={user.data && playerview ? "switchOuter" : "switchOuter OuterOff"}
                        onClick={_ => this.props.TOGGLEPLAYERVIEW()}>
                        <div className={user.data && playerview ? "switch" : "switch off"}></div>
                    </div>
                    <h7 className="switchLabel">Player View</h7>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="inTooltip">
                    <div className="switchOuter" id="lock">
                        <div className="switch off" id="lockbutton"></div>
                    </div>
                    <h7 className="switchLabel">Player View</h7>
                </div>
                </div>
            )
        }
    }
}