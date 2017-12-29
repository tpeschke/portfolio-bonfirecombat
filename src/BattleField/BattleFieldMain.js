import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS } from '../ducks/reducer'

import Counter from './Count';
import OnDeck from './OnDeck';
// import Acting from './Acting';

class BattleFieldMain extends Component {

    componentDidMount() {
       this.props.LOADCOMBATANTS(this.props.combatId)
    }

    
    render() {

        return (
            <div className="BattleField">
            {this.props.combatId}

            <Counter/>

            <OnDeck
                 list={this.props.fighterList}/>

            {/* <Acting
                acting={this.state.acting}/> */}
            </div>
        )
    }
}

function mapStateToProps ( state ) {
    var { combatId, fighterList } = state

    return {
        combatId,
        fighterList
    }
}

export default connect( mapStateToProps, { LOADCOMBATANTS } ) ( BattleFieldMain )