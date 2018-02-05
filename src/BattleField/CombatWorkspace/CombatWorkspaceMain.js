import React, { Component } from 'react';

import AddNewFighter from './AddNewFighter'
import NewStatus from './AddNewStatus'
import socketFun from '../../playerview/SocketApi'

import { connect } from 'react-redux'

import { CLEARFIELD } from '../../ducks/reducer'

class Workspace extends Component {

    handleClearField = () => {
        socketFun.playerClear({hash : this.props.hash})
        this.props.CLEARFIELD()
    }

    render() {

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
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        hash : state.hash
    }
}

export default connect(mapStateToProps, {CLEARFIELD})(Workspace)