import React, { Component } from 'react';

import AddNewFighter from './AddNewFighter'

import { connect } from 'react-redux'

import { CLEARFIELD } from '../../ducks/reducer'

class Workspace extends Component {

    render() {

        return (
            <div className="BattleSidebar Main" id="Workspace">
                <h2>Combat Workspace</h2>

                <div className="WorkspaceBody">
                <AddNewFighter />

                <button className="workshopButton"
                    onClick={this.props.CLEARFIELD}
                    >Clear Field</button>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) { return {}}

export default connect(mapStateToProps, {CLEARFIELD})(Workspace)