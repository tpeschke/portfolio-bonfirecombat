import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED } from '../ducks/reducer'

import Counter from './Count';
import OnDeck from './MainFieldComp/OnDeck';
import Acting from './MainFieldComp/Acting';
import Graveyard from './MainFieldComp/Graveyard';
import CombatWorkspace from './CombatWorkspace/CombatWorkspaceMain'

class BattleFieldMain extends Component {

    componentDidMount() {
        this.props.LOADCOMBATANTS(this.props.combatId)
    }

    render() {

        return (
            <div className="BattleMain">
                    <div className="BattleHeader">
                        <h1>{this.props.combatName}</h1>
                    </div>

                    <Counter />

                <div className="BattleBody">
                    <div className="BattleField">
                    <h2>the Quick</h2>
                        <OnDeck
                            list={this.props.fighterList}
                            count={this.props.count}
                            kill={this.props.KILLCOMBATANT}
                            advance={this.props.ADVANCESPEED} />

                        <Acting
                            list={this.props.fighterList}
                            count={this.props.count}
                            kill={this.props.KILLCOMBATANT}
                            advance={this.props.ADVANCESPEED} />
                    </div>

                    <div className="BattleSidebarOuter">
                        <CombatWorkspace />
                        
                        <Graveyard
                            list={this.props.fighterList}
                            count={this.props.count}
                            kill={this.props.KILLCOMBATANT}
                            remove={this.props.REMOVEFIGHTER} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, combatName, fighterList, count } = state

    return {
        combatId,
        combatName,
        fighterList,
        count
    }
}

let actionBuilder = {
    LOADCOMBATANTS,
    KILLCOMBATANT,
    REMOVEFIGHTER,
    ADVANCESPEED
}

export default connect(mapStateToProps, actionBuilder )(BattleFieldMain)