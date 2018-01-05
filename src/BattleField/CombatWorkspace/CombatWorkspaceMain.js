import React, { Component } from 'react';

import AddNewFighter from './AddNewFighter'

class Workspace extends Component {

    render() {

        return (
            <div className="BattleSidebar Main" id="Workspace">
                <h2>Combat Workspace</h2>

                <div className="WorkspaceBody">
                <AddNewFighter />
                <button className="workshopButton">Clear Field</button>
                </div>
            </div>
        )
    }

}

export default Workspace