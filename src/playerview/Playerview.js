import React, { Component } from 'react'
import axios from 'axios'

import { connect} from 'react-redux'

import './playerview.css'

class PlayerView extends Component {

    render() {
        return (
            <div className="playerBody">
                <h1>Player view</h1>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { count, combatId, combatName, playerview, fighterList, statusList } = state


    return {
        count, 
        combatId, 
        combatName, 
        playerview, 
        fighterList, 
        statusList
    }
}

export default connect(mapStateToProps)(PlayerView)