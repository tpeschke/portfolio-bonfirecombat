import React, { Component } from 'react';
import PlayerviewToggle from './PlayerviewToggle'

import AddNewFighter from './AddNewFighter'
import NewStatus from './AddNewStatus'
import socketFun from '../../playerview/SocketApi'

import { connect } from 'react-redux'

import { CLEARFIELD, TOGGLEPLAYERVIEW } from '../../ducks/reducer'

class Workspace extends Component {

    componentWillUnmount() {
        this.props.TOGGLEPLAYERVIEW()
    }

    handleClearField = () => {
        socketFun.playerClear({hash : this.props.hash})
        this.props.CLEARFIELD()
    }

    render() {
        let {hash, user, playerview, TOGGLEPLAYERVIEW} = this.props

        return (
            <div className="BattleSidebar Main" id="Workspace">
                <h2>Combat Workspace</h2>

                <div className="WorkspaceBody">
                <AddNewFighter />

                <NewStatus />

                <button className="workshopButton"
                    onClick={this.handleClearField}
                    >Clear Field</button>
                </div>

                <div className="border"></div>

                <PlayerviewToggle
                   user={user}
                   playerview={playerview}
                   hash={hash}
                   TOGGLEPLAYERVIEW={this.props.TOGGLEPLAYERVIEW} />
            </div>
        )
    }

}

function mapStateToProps(state) {
    let {hash, user, playerview} = state
    return {
        hash,
        user,
        playerview
    }
}

export default connect(mapStateToProps, {CLEARFIELD, TOGGLEPLAYERVIEW})(Workspace)