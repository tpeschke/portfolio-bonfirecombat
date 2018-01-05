import React, { Component } from 'react';

import { connect } from 'react-redux';

import { OPENMODAL, OPENTOP, OPENMODAL2, OPENTOP2 } from '../ducks/reducer'
import {LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED, INPUTACTION} from '../ducks/CompReducers/CombatantsReducer'

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

        var { fighterList, count, KILLCOMBATANT, ADVANCESPEED, INPUTACTION, OPENMODAL, OPENMODAL2, OPENTOP, OPENTOP2, REMOVEFIGHTER } = this.props

        return (
            <div className="BattleMain">
                <div className="BattleHeader">
                    <h1 className="fontHeader">{this.props.combatName}</h1>
                    <button className="BattleSaveButton">Save Field</button>
                </div>
                <div className="counterOuter">
                    <Counter />
                </div>

                <div className="BattleBodyWork">
                    <div className="BattleBody">
                        <div className="BattleField">
                            <h2>the Quick</h2>
                            <OnDeck
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                advance={ADVANCESPEED}
                                action={INPUTACTION}
                                modal={OPENMODAL}
                                top={OPENTOP} />

                            <Acting
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                advance={ADVANCESPEED}
                                action={INPUTACTION}
                                modal2={OPENMODAL2}
                                top2={OPENTOP2} />
                        </div>

                        <div className="BattleSidebarOuter">
                            <CombatWorkspace />

                            <Graveyard
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                remove={REMOVEFIGHTER} />
                        </div>
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
    OPENTOP,
    OPENMODAL2,
    OPENTOP2
}

export default connect(mapStateToProps, actionBuilder)(BattleFieldMain)