import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS } from '../ducks/reducer'

import Counter from './Count';
import OnDeck from './OnDeck';
import Acting from './Acting';

class BattleFieldMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            onDeck: props.fighterList.onDeck,
            acting: props.fighterList.acting
        }
    }

    componentDidMount() {
       this.props.LOADCOMBATANTS(this.props.combatId)
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState( { onDeck: nextProps.fighterList.OnDeck,
    //                         acting: nextProps.fighterList.acting } )
    // }

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
    var { combatId, fighterList } = state

    return {
        combatId,
        fighterList
    }
}

export default connect( mapStateToProps, { LOADCOMBATANTS } ) ( BattleFieldMain )