import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS } from '../ducks/reducer'

import Counter from './Count';
import OnDeck from './OnDeck';
import Acting from './Acting';
import { setTimeout } from 'timers';


class BattleFieldMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            onDeck: props.fighterTotal.onDeck,
            acting: props.fighterTotal.acting
        }
    }

    componentDidMount() {
       this.props.LOADCOMBATANTS(this.props.combatId)
       setTimeout( console.log(this.state.onDeck), 5000)
    }

    render() {

        return (
            <div className="BattleField">
            {this.props.combatId}

            <Counter/>

            <OnDeck
                 onDeck={this.state.onDeck}/>

            <Acting
                acting={this.state.acting}/>
            </div>
        )
    }
}

function mapStateToProps ( state ) {
    var { combatId, fighterTotal } = state

    return {
        combatId,
        fighterTotal
    }
}

export default connect( mapStateToProps, { LOADCOMBATANTS } ) ( BattleFieldMain )