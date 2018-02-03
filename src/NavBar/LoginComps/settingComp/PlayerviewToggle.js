import React, { Component } from 'react'

export default class PlayerviewToggle extends Component {

    lock = () => {
        var { user, playerview, hash } = this.props

        if (hash === null) {
            return <div>
                <div className="inTooltip">
                    <div className="switchOuter" id="lock">
                        <div className="switch off" id="lockbutton"></div>
                    </div>
                    <h7 className="switchLabel">Player View</h7>
                </div>
            </div>

        } else {
            return <div className="inTooltip">
                <div className={user.data && playerview ? "switchOuter" : "switchOuter OuterOff"}
                    onClick={_ => this.props.TOGGLEPLAYERVIEW()}>
                    <div className={user.data && playerview ? "switch" : "switch off"}></div>
                </div>
                <h7 className="switchLabel">Player View</h7>
            </div>
        }
    }

    render() {
        return (
            <div>
                {this.lock()}
            </div>
        )
    }
}