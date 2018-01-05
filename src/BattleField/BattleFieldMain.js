import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED, INPUTACTION, OPENMODAL, OPENTOP } from '../ducks/reducer'

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
                        <button className="BattleSaveButton">Save Field</button>
                    </div>

                    <Counter />

                <div className="BattleBody">
                    <div className="BattleField">
                    <h2>the Quick</h2>
                        <OnDeck
                            list={this.props.fighterList}
                            count={this.props.count}
                            kill={this.props.KILLCOMBATANT}
                            advance={this.props.ADVANCESPEED}
                            action={this.props.INPUTACTION}
                            modal={this.props.OPENMODAL}
                            top={this.props.OPENTOP}  />

                        <Acting
                            list={this.props.fighterList}
                            count={this.props.count}
                            kill={this.props.KILLCOMBATANT}
                            advance={this.props.ADVANCESPEED}
                            action={this.props.INPUTACTION}
                            modal={this.props.OPENMODAL}
                            top={this.props.OPENTOP}  />
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
    ADVANCESPEED,
    INPUTACTION,
    OPENMODAL,
    OPENTOP
}

export default connect(mapStateToProps, actionBuilder )(BattleFieldMain)