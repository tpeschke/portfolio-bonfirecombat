import React, { Component } from 'react'

import { connect } from 'react-redux'

import { CHANGEBATTLENAME } from '../../ducks/reducer'

class BattleName extends Component {

    render() {

        return (
            <div className="BattleHeader">
                <input 
                    className="fontHeader"
                    id="BattleNameInput"
                    placeholder={this.props.combat}
                    onBlur={e=>this.props.CHANGEBATTLENAME(e.target.value)}/>
                <button
                    >Save Field</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatName } = state
    
    return {
        combatName
    }
}

let actionBuilder = {
    CHANGEBATTLENAME
}

export default connect(mapStateToProps, actionBuilder) (BattleName)