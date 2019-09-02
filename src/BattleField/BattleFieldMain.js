import React, { Component } from 'react';

import { connect } from 'react-redux';
import Modal from 'react-responsive-modal'

import { OPENMODAL, OPENTOP, OPENMODAL2, OPENTOP2, PAGELOCATION, TOGGLESAVE, WEAPONMODAL, WEAPONMODAL2, ROLLINIT, HIDEFIGHTER, INPUTHEALTH, INPUTFATIGUE } from '../ducks/reducer'
import { LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED, INPUTACTION, GETHASH } from '../ducks/CompReducers/CombatantsReducer'
import { GETALLSTATUSES } from '../ducks/CompReducers/StatusReducer'

import Counter from './CountComp/Count';
import OnDeck from './MainFieldComp/OnDeck';
import Acting from './MainFieldComp/Acting';
import Graveyard from './MainFieldComp/Graveyard';
import CombatWorkspace from './CombatWorkspace/CombatWorkspaceMain';
import BattleName from './MainFieldComp/BattleName';
import Statuses from './MainFieldComp/Statuses';
import SaveFieldModals from './SaveFieldModals';

import socketFun from '../playerview/SocketApi'

import "./BattleField.css"

class BattleFieldMain extends Component {

    constructor() {
        super()

        this.state = {
            modalOpen: false
        }
    }

    componentDidMount() {
        this.props.LOADCOMBATANTS(this.props.combatId);
        this.props.GETALLSTATUSES(this.props.combatId);
        this.props.PAGELOCATION('/BattleField');
        this.props.GETHASH(this.props.combatId);
        this.props.setHeight((72 + document.getElementById('Battle').clientHeight) + 'px')

        this.setState({ id: setInterval(this.startSending, 500) })
    }

    componentWillUnmount() {
        clearInterval(this.state.id)
        let { playerview, hash, TOGGLEPLAYERVIEW } = this.props
        if (playerview) {
            socketFun.sendBattle({ hash, playerview: false })
            TOGGLEPLAYERVIEW()
        }
    }

    componentDidUpdate() {
        this.props.setHeight((72 + document.getElementById('Battle').clientHeight) + 'px');
    }

    startSending = () => {
        var { hash, playerview } = this.props

        socketFun.sendBattle({ hash: hash, playerview: playerview })
    }

    openWorkspace = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    render() {

        var { fighterList, count, hash, KILLCOMBATANT, ADVANCESPEED, INPUTACTION, OPENMODAL, OPENMODAL2, OPENTOP, OPENTOP2, REMOVEFIGHTER, REDUXSORT, WEAPONMODAL, WEAPONMODAL2, ROLLINIT, HIDEFIGHTER, theme, INPUTHEALTH, INPUTFATIGUE } = this.props
        return (
            <div className="BattleMain fadeInApp" id="Battle">
                <BattleName
                    combat={this.props.combatName}
                    hash={hash} />

                <div className="counterOuter">
                    <Counter />
                </div>

                <div className="BattleBodyWork">
                    <div className="BattleBody">
                        <div className={`BattleField ${theme}-BattleField`}>
                            <div className="battlefieldShell">
                                <h2 className={`${theme}-h2`}>the Quick</h2>
                                <i onClick={_ => this.openWorkspace()} className="fas fa-edit editIconMain"></i>
                            </div>

                            <OnDeck
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                advance={ADVANCESPEED}
                                action={INPUTACTION}
                                health={INPUTHEALTH}
                                fatigue={INPUTFATIGUE}
                                modal={OPENMODAL}
                                top={OPENTOP}
                                hash={hash}
                                reduxSort={REDUXSORT}
                                weaponModal={WEAPONMODAL}
                                rollInit={ROLLINIT}
                                hide={HIDEFIGHTER}
                                theme={theme} />

                            <Acting
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                advance={ADVANCESPEED}
                                action={INPUTACTION}
                                health={INPUTHEALTH}
                                fatigue={INPUTFATIGUE}
                                modal2={OPENMODAL2}
                                top2={OPENTOP2}
                                hash={hash}
                                weaponModal2={WEAPONMODAL2}
                                rollInit={ROLLINIT}
                                hide={HIDEFIGHTER}
                                theme={theme} />

                            <Graveyard
                                list={fighterList}
                                count={count}
                                kill={KILLCOMBATANT}
                                remove={REMOVEFIGHTER}
                                hash={hash}
                                theme={theme} />
                        </div>
                    </div>
                </div>

                <Modal open={this.state.modalOpen} little
                    onClose={this.openWorkspace}
                    classNames={{ modal: 'baseModalSave' }}
                    showCloseIcon={false}>
                    <div className="combatWorkspaceModal">
                        <CombatWorkspace />
                    </div>
                </Modal>

                <SaveFieldModals
                    pending={this.props.pendingSaveOpen}
                    finished={this.props.finishedSaveOpen}
                    TOGGLESAVE={this.props.TOGGLESAVE} />

                <div className="StatusOver">
                    <Statuses />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, combatName, fighterList, count, playerview, pendingSaveOpen, finishedSaveOpen, statusList, hash, theme } = state

    return {
        combatId, combatName, fighterList, count, statusList, playerview, pendingSaveOpen, finishedSaveOpen, hash, theme
    }
}

let actionBuilder = {
    LOADCOMBATANTS, KILLCOMBATANT, REMOVEFIGHTER, ADVANCESPEED, INPUTACTION, OPENMODAL, OPENTOP, OPENMODAL2, OPENTOP2, GETALLSTATUSES, PAGELOCATION, TOGGLESAVE, GETHASH, WEAPONMODAL, WEAPONMODAL2, ROLLINIT, HIDEFIGHTER, INPUTHEALTH, INPUTFATIGUE
}

export default connect(mapStateToProps, actionBuilder)(BattleFieldMain)