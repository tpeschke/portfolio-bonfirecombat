import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import _ from 'lodash'

import { SketchPicker } from 'react-color';
import socketFun from '../../playerview/SocketApi'

import { ADDNEWCOMBATANT } from '../../ducks/CompReducers/CombatantsReducer'
import AddWeapon from './AddWeapon'
import makeid from '../../components/makeid'
import ToggleHidden from './ToggleHidden'
import { checkStr, checkNum } from '../../components/validation'
import axios from 'axios';
import rollDice from '../../components/diceRoll'

class AddNewFighter extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            color: '#fff',
            name: '',
            weapons: [{ id: 1, weapon: 'Unarmed', speed: 10, selected: '1' }],
            action: 0,
            dice: 1,
            hidden: '0',
            max_health: 10,
            stress: 0,
            times: 1,
            panic: null,
            broken: null,
            weapon: false,
            warningOpen: false,
            hash: false
        }

    }

    onOpenModal = () => {
        if (this.props.fighterListLength <= this.props.user.data.patreon * 5 || this.props.fighterListLength < 5) {
            this.setState({ open: true });
        } else {
            this.setState({ warningOpen: true }, _ => setTimeout(_ => this.setState({ warningOpen: false }), 5000))
        }
    };

    onCloseModal = () => {
        this.setState({ open: false, color: '#fff', name: '', weapons: [{ id: 1, weapon: 'Unarmed', speed: 10, selected: '1' }], action: null, weapon: false });
    };

    closeWarning = () => {
        this.setState({ warningOpen: false });
    };

    //==========================================

    handleChange = (color) => {
        this.setState({ color: color.hex });
    }

    handleHide = () => {
        if (this.state.hidden === '1') {
            this.setState({ hidden: '0' })
        } else {
            this.setState({ hidden: '1' })
        }
    }

    // ============================ \\

    addByHash = () => {
        if (this.state.hash) {
            axios.get('/api/beast/' + this.state.hash.trim()).then(({ data }) => {
                let max_health = rollDice(data.vitality);
                let encumbrance = 10;
                let weapons = []
                data.combat.forEach(val => {
                    if (val.weapon !== 'Base') {
                        weapons.push({ ...val, id: makeid(), weapon: val.weapon, speed: val.spd, selected: '0', encumb: val.encumb }) 
                        weapons.push({ ...val, id: makeid(), weapon: `${val.weapon} (IG)`, speed: val.spd + Math.ceil(val.measure / 2), selected: '0', encumb: val.encumb }) 
                    } else {
                        encumbrance = val.encumb;
                        weapons.push({ ...val, id: makeid(), weapon: "Unarmed", speed: 9 + +val.spd, selected: '1', encumb: +encumbrance, damage: `d6+${+val.damage + 1}` })
                        weapons.push({ ...val, id: makeid(), weapon: val.weapon, speed: val.spd, selected: '0', encumb: +encumbrance })
                    }
                })
                if (weapons.length === 1) {
                    weapons[0].selected = '1'
                }
                this.setState({ name: data.name, max_health, weapons, encumbrance, panic: data.panic === 7 ? null : data.panic, broken: data.broken === 7 ? null : data.broken })
            })
        }
    }

    // ============================ \\

    addWeapon = (weapon) => {
        let weaponArray = this.state.weapons.slice()
        weaponArray.push({ ...weapon, id: makeid() })
        this.setState({ weapons: weaponArray })
    }

    editWeapon = (weapon) => {
        let weaponArray = this.state.weapons.slice()
        weaponArray.forEach((v, i) => {
            if (v.id == weapon.id) {
                let selected = v.selected
                weaponArray.splice(i, 1, { ...weapon, selected })
            }
        })
        this.setState({ weapons: weaponArray })
    }

    selectWeapon = (wid) => {
        let encumbrance = this.state.encumbrance;
        let weaponsArray = this.state.weapons.map(val => {
            if (val.id == wid) {
                encumbrance = val.encumb
                val.selected = '1'
            } else {
                val.selected = '0'
            }
            return val
        })
        this.setState({ weapons: weaponsArray, encumbrance })
    }

    deleteWeapon = (wid) => {
        let weaponsArray = this.state.weapons.slice()
        if (wid !== 1) { weaponsArray = this.state.weapons.filter(val => val.id != wid) }
        this.setState({ weapons: weaponsArray })
    }

    doneWithWeapon = () => {
        this.setState({ weapon: false })
    }

    // ============================ \\

    handleSubmit = (combatid) => {
        const { color, name, weapons, action, dice, hidden, max_health, stress, encumbrance, panic, broken } = this.state;
        if (name !== '') {
            var newId = makeid()

            var newFighter = {
                id: newId,
                colorcode: color,
                weapons: _.cloneDeep(weapons),
                actioncount: dice ? [dice, action] : action,
                topcheck: '0',
                acting: '0',
                dead: '0',
                hidden,
                health: 0,
                max_health,
                stress,
                encumbrance,
                panic,
                broken,
                idcombat: combatid
            }

            for (let i = 0; i < this.state.times; i++) {
                let namefighter = this.state.times !== 1 ? `${i+1} ${name}` : name;
                this.props.ADDNEWCOMBATANT({ namefighter, ...newFighter })
                socketFun.playerAdd({ hash: this.props.hash, fighter: { colorcode: color, dead: '0', hidden: '1', id: newId, namefighter: namefighter, topcheck: '0', weapon: weapons.filter(v => v.selected == '1')[0].weapon } })
            }
            this.onCloseModal()

            this.setState({
                open: false,
                color: '#fff',
                name: '',
                weapons: [{ id: 1, weapon: 'Unarmed', speed: 10, selected: '1' }],
                action: 0,
                dice: 1,
                hidden: '0',
                max_health: 10,
                stress: 0,
                encumbrance: 10,
                panic: null,
                broken: null,
                weapon: false,
                warningOpen: false,
                hash: false
            })
        } else {
            this.onCloseModal()
        }
    }

    render() {

        const { open, color, name, weapons, action, dice, hidden, max_health, stress, encumbrance } = this.state;
        const { combatId, theme } = this.props

        let show = () => {
            if (!this.state.weapon) {
                return (
                    <div>

                        <div className="hash-input-shell">
                            <div>
                                <input className={`modalEditInput ${theme}-inputSpecial`} id="hash-input" type="text" placeholder="import by bestiary hash"
                                    onChange={e => this.setState({ hash: e.target.value })} />
                                <button className={`${theme}-secColor ${theme}-secFont`} id="modalAddButton"
                                    onClick={this.addByHash}>IMPORT</button>
                            </div>
                        </div>

                        <div className="inModalNew">
                            <div className="modalLeft">
                                <SketchPicker
                                    color={this.state.color}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="modalRight">

                                <h1 className={`${theme}-secFont ${theme}-secColor`} id="newCombat">Add Combatant</h1>

                                <div className={`${theme}-border modalBorder border-non-centered`}></div>

                                <div className="fighter-name-hidden">

                                    <ToggleHidden
                                        on={hidden}
                                        hide={this.handleHide} />

                                    <div className="new-fighter-input-shell">
                                        <p className="new-fighter-name">Name</p>
                                        <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                            value={this.state.name}
                                            onChange={e => checkStr(e.target.value) ? this.setState({ name: e.target.value }) : null} />
                                    </div>
                                </div>

                                <button className={`newFighterButton ${theme}-font`}
                                    onClick={_ => this.setState({ weapon: true })}
                                >ADD WEAPONS</button>

                                <div className="new-fighter-input-shell">
                                    <p>Initiative Dice</p>
                                    <div>
                                        1d<input className={`modalEditInput ${theme}-inputSpecial modalDiceInput`}
                                            value={this.state.dice}
                                            onChange={e => checkNum(e.target.value) ? this.setState({ dice: +e.target.value }) : null} />
                                        +
                                    <input className={`modalEditInput ${theme}-inputSpecial modalDiceInput`}
                                            value={this.state.action}
                                            onChange={e => checkNum(e.target.value) ? this.setState({ action: +e.target.value }) : null} />
                                    </div>
                                </div>

                                <div className="new-fighter-input-shell">
                                    <p>Max Vitality</p>
                                    <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                        value={this.state.max_health}
                                        onChange={e => checkNum(e.target.value) ? this.setState({ max_health: e.target.value }) : null} />
                                </div>

                                <div className="new-fighter-input-shell">
                                    <p>Starting Stress</p>
                                    <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                        value={this.state.stress}
                                        onChange={e => checkNum(e.target.value) ? this.setState({ stress: e.target.value }) : null} />
                                </div>

                                <div className="new-fighter-input-shell">
                                    <p>Number to Add</p>
                                    <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                        placeholder="Number" value={this.state.times}
                                        onChange={e => checkNum(e.target.value) ? this.setState({ times: e.target.value }) : null} />
                                </div>

                                <button className={`${theme}-secColor ${theme}-secFont submit-button`} id="modalAddButton"
                                    onClick={_ => this.handleSubmit(combatId)}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <AddWeapon
                            weapons={this.state.weapons}
                            addWeapon={this.addWeapon}
                            selectWeapon={this.selectWeapon}
                            deleteWeapon={this.deleteWeapon}
                            editWeapon={this.editWeapon}
                            doneWithWeapon={this.doneWithWeapon}
                            theme={theme}
                            checkStr={checkStr}
                            checkNum={checkNum} />
                    </div>
                )
            }
        }

        return (
            <div>
                <button
                    className={`workshopButton ${theme}-font`}
                    onClick={this.onOpenModal}>Add New Combatant</button>

                <Modal open={open} onClose={this.onCloseModal} little
                    classNames={{ modal: 'modalBaseToP' }}
                    showCloseIcon={false}>
                    <div className={`outModalNew ${theme}-outModalNew`}>
                        <div className={`${theme}-modalBannerNew`}></div >

                        {show()}

                    </div>
                </Modal>

                <Modal open={this.state.warningOpen} onClose={this.closeWarning} little
                    classNames={{ modal: 'modalWarning' }}
                    showCloseIcon={true}>
                    <div className={`modalWarning`}>
                        You need to upgrade your Patreon Tier to add more fighters to this field.
                    </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
    var { count, combatId, hash, theme } = state

    return {
        count,
        combatId,
        hash,
        theme
    }
}

export default connect(mapStateToProps, { ADDNEWCOMBATANT })(AddNewFighter)