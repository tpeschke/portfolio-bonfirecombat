import React, { Component } from 'react';

import AddNewFighter from './AddNewFighter'

class Workspace extends Component {

    render() {

        return (
            <div className="BattleSidebar Workspace">
                <h2>Combat Workspace</h2>

                <AddNewFighter />
            </div>
        )
    }

}

export default Workspace