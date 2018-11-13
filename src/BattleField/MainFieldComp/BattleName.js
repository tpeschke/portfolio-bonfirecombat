import React, { Component } from 'react'
import socketFun from '../../playerview/SocketApi'

import { connect } from 'react-redux'

import { CHANGEBATTLENAME, SAVEFIELD } from '../../ducks/reducer'
import {checkStr} from '../../components/validation'

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
                    className={`fontHeader inputFinder ${this.props.theme}-color`}
                    id="BattleNameInput"
                    placeholder={this.props.combatName}
                    onBlur={e=> checkStr(e.target.value) ? this.props.CHANGEBATTLENAME(e.target.value) : null}/>
              
                <button
                    className={`${this.props.theme}-font`}
                    onClick={this.handleSaveField}
                >Save Field</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatName, count, combatId, fighterList, statusList, theme } = state
    
    return {
        combatName,
        count,
        combatId,
        fighterList,
        statusList,
        theme
    }
}

let actionBuilder = {
    CHANGEBATTLENAME,
    SAVEFIELD
}

export default connect(mapStateToProps, actionBuilder) (BattleName)