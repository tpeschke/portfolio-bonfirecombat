import React, { Component } from 'react';

import { connect } from 'react-redux';

import sort from '../components/sort'
import { LOADCOMBATANTS } from '../ducks/reducer'


class BattleFieldMain extends Component {

    componentDidMount() {
       this.props.LOADCOMBATANTS(this.props.combatId)
    }

    render() {

        return (
            <div className="BattleField">
            <p>BattleField</p>
            {this.props.combatId}

            {/* <button onClick={_=> this.getCombat(this.props.combatId)}>test </button> */}
            </div>
        )
    }
}

function mapStateToProps ( state ) {
    var { count, combatId, fighterTotal } = state

    return {
        count,
        combatId,
        fighterTotal
    }
}

export default connect( mapStateToProps, { LOADCOMBATANTS } ) ( BattleFieldMain )