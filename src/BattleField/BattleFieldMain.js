import React, { Component } from 'react';

import { connect } from 'react-redux';

import { OPENMODAL, OPENTOP, OPENMODAL2, OPENTOP2, PAGELOCATION, TOGGLESAVE } from '../ducks/reducer'
import { LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED, INPUTACTION } from '../ducks/CompReducers/CombatantsReducer'
import { GETALLSTATUSES } from '../ducks/CompReducers/StatusReducer'

import Counter from './CountComp/Count';
import OnDeck from './MainFieldComp/OnDeck';
import Acting from './MainFieldComp/Acting';
import Graveyard from './MainFieldComp/Graveyard';
import CombatWorkspace from './CombatWorkspace/CombatWorkspaceMain';
import BattleName from './MainFieldComp/BattleName';
import Statuses from './MainFieldComp/Statuses';
import SaveFieldModals from './SaveFieldModals'

import "./BattleField.css"

class BattleFieldMain extends Component {

    componentDidMount() {
        this.props.LOADCOMBATANTS(this.props.combatId);
        this.props.GETALLSTATUSES(this.props.combatId);
        this.props.PAGELOCATION('/BattleField');
        this.props.setHeight((72 + document.getElementById('Battle').clientHeight) + 'px')
    }
    componentDidUpdate() {
        this.props.setHeight((72 + document.getElementById('Battle').clientHeight) + 'px');
    }

    render() {

        var { fighterList, count, KILLCOMBATANT, ADVANCESPEED, INPUTACTION, OPENMODAL, OPENMODAL2, OPENTOP, OPENTOP2, REMOVEFIGHTER } = this.props


        return (
            <div className="BattleMain fadeInApp" id="Battle">
                <BattleName
                    combat={this.props.combatName} />

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

                <SaveFieldModals 
                    pending={this.props.pendingSaveOpen}
                    finished={this.props.finishedSaveOpen}
                    TOGGLESAVE={this.props.TOGGLESAVE}/>

                <div className="StatusOver">
                    <Statuses />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, combatName, fighterList, count, pendingSaveOpen, finishedSaveOpen } = state

    return {
        combatId,
        combatName,
        fighterList,
        count,
        pendingSaveOpen,
        finishedSaveOpen
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
    OPENTOP2,
    GETALLSTATUSES,
    PAGELOCATION,
    TOGGLESAVE
}

export default connect(mapStateToProps, actionBuilder)(BattleFieldMain)