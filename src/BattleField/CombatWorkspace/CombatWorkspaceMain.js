import React, { Component } from 'react';
import PlayerviewToggle from './PlayerviewToggle'

import AddNewFighter from './AddNewFighter'
import NewStatus from './AddNewStatus'
import socketFun from '../../playerview/SocketApi'

import { connect } from 'react-redux'

import { CLEARFIELD, TOGGLEPLAYERVIEW } from '../../ducks/reducer'

class Workspace extends Component {

    componentWillUnmount() {
        let { playerview, hash, TOGGLEPLAYERVIEW } = this.props
        if (playerview) {
            socketFun.sendBattle({ hash, playerview: false })
            TOGGLEPLAYERVIEW()
        }
    }

    handleClearField = () => {
        socketFun.playerClear({ hash: this.props.hash })
        this.props.CLEARFIELD()
    }

    render() {
        let { hash, user, playerview, TOGGLEPLAYERVIEW, theme } = this.props

        return (
            <div className={`BattleSidebar ${theme}-BattleSidebar Main`} id="Workspace">
                <h2 className={`${theme}-h2`}>Combat Workspace</h2>
                <div className={`${this.props.theme}-border border-spacer`}></div>

                <div className="WorkspaceBody">
                    <AddNewFighter />

                    <NewStatus />

                    <button className={`workshopButton ${theme}-font`}
                        onClick={this.handleClearField}
                    >Clear Field</button>
                </div>

                <div className={`${this.props.theme}-border border-spacer`}></div>

                <PlayerviewToggle
                    user={user}
                    playerview={playerview}
                    hash={hash}
                    TOGGLEPLAYERVIEW={TOGGLEPLAYERVIEW}
                    theme={theme} />
            </div>
        )
    }

}

function mapStateToProps(state) {
    let { hash, user, playerview, theme } = state
    return {
        hash,
        user,
        playerview,
        theme
    }
}

export default connect(mapStateToProps, { CLEARFIELD, TOGGLEPLAYERVIEW })(Workspace)