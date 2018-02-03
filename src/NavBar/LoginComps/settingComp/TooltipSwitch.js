import React, { Component } from 'react'

import PlayerviewToggle from './PlayerviewToggle'

import { connect } from 'react-redux'
import { FLIPTOOLTIP, TOGGLEPLAYERVIEW } from '../../../ducks/reducer'

class TooltipSwitch extends Component {

    render() {

        var { user, hash, playerview } = this.props

        return (
            <div className="outTooltip">
                <div className="inTooltip">
                    <div className={user.data && user.data.tooltip === '1' ? "switchOuter" : "switchOuter OuterOff"}
                        onClick={_ => this.props.FLIPTOOLTIP()}>
                        <div className={user.data && user.data.tooltip === '1' ? "switch" : "switch off"}></div>
                    </div>
                    <h7 className="switchLabel">Counter Tool-tips</h7>
                </div>

                <PlayerviewToggle
                    user={user}
                    playerview={playerview}
                    TOGGLEPLAYERVIEW={this.props.TOGGLEPLAYERVIEW} />

                <div>
                    <div className="inTooltip hash">
                        <h7 className="switchLabel" id="hashTitle">Player View Hash</h7>
                        <div className="hashUrl">
                            <div className="innerHashUrl">
                                <p className="hashUrlText" id="hashBaseUrl">hmcombat.tpeschke.com/player/</p>
                                <p className="hashUrlText" id="hashBattleUrl">{this.props.hash}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    var { user, hash, playerview } = state
    return {
        user,
        hash,
        playerview
    }
}

let actionBuilders = {
    FLIPTOOLTIP,
    TOGGLEPLAYERVIEW
}

export default connect(mapStateToProps, actionBuilders)(TooltipSwitch)