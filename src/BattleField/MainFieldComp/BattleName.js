import React, { Component } from 'react'
import socketFun from '../../playerview/SocketApi'

import { connect } from 'react-redux'

import { CHANGEBATTLENAME, SAVEFIELD } from '../../ducks/reducer'

class BattleName extends Component {

    handleSaveField = () => {
        var {combatName,
            count,
            combatId,
            fighterList,
            statusList,} = this.props

        var tempField = {
            combatName,
            count,
            combatId,
            fighterList,
            statusList
        }
        this.props.SAVEFIELD(tempField)
    }

    handleSave = () => {
        socketFun.playerUpdate({hash: this.props.hash})
    }
    
    render() {
        return (
            <div className="BattleHeader">
                <input 
                    className="fontHeader inputFinder"
                    id="BattleNameInput"
                    placeholder={this.props.combatName}
                    onBlur={e=>this.props.CHANGEBATTLENAME(e.target.value)}/>
              
                <button
                    onClick={this.handleSaveField}
                >Save Field</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatName, count, combatId, fighterList, statusList } = state
    
    return {
        combatName,
        count,
        combatId,
        fighterList,
        statusList
    }
}

let actionBuilder = {
    CHANGEBATTLENAME,
    SAVEFIELD
}

export default connect(mapStateToProps, actionBuilder) (BattleName)