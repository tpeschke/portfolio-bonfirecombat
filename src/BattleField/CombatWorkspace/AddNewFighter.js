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
            fatigue: 0,
            weapon: false,
            warningOpen: false
        }

    }

    onOpenModal = () => {
        if (this.props.fighterListLength <= this.props.user.data.patreon * 10) {
            this.setState({ open: true });
        } else {
            this.setState({warningOpen: true}, _ => setTimeout(_=>this.setState({warningOpen: false}), 5000))
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
        let weaponsArray = this.state.weapons.map(val => {
            if (val.id == wid) {
                val.selected = '1'
            } else {
                val.selected = '0'
            }
            return val
        })
        this.setState({ weapons: weaponsArray })
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

    handleSubmit = (c, n, w, a, d, id, h, mh, f) => {
        if (n !== '') {
            var newId = makeid()

            var newFighter = {
                id: newId,
                namefighter: n,
                colorcode: c,
                weapons: _.cloneDeep(w),
                actioncount: d ? [d, a] : a,
                topcheck: '0',
                acting: '0',
                dead: '0',
                hidden: h,
                health: 0,
                max_health: mh,
                fatigue: f,
                idcombat: id
            }

            console.log(newFighter)

            this.props.ADDNEWCOMBATANT(newFighter)
            socketFun.playerAdd({ hash: this.props.hash, fighter: { colorcode: c, dead: '0', hidden: '1', id: newId, namefighter: n, topcheck: '0', weapon: w.filter(v => v.selected == '1')[0].weapon } })
            this.onCloseModal()

            this.forceUpdate()
        } else {
            this.onCloseModal()
        }
    }

    render() {

        const { open, color, name, weapons, action, dice, hidden, max_health, fatigue } = this.state;
        const { combatId, theme } = this.props

        let show = () => {
            if (!this.state.weapon) {
                return (
                    <div className="inModalNew">
                        <div className="modalLeft">
                            <SketchPicker
                                color={this.state.color}
                                onChange={this.handleChange} />
                        </div>
                        <div className="modalRight">

                            <h1 className={`${theme}-secFont ${theme}-secColor`} id="newCombat">Add New Combatant</h1>

                            <div className={`${theme}-border modalBorder`}></div>

                            <p>Name</p>
                            <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                value={this.state.name}
                                onChange={e => checkStr(e.target.value) ? this.setState({ name: e.target.value }) : null} />

                            <button className={`newFighterButton ${theme}-font`}
                                onClick={_ => this.setState({ weapon: true })}
                            >Add Weapons</button>

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

                            <p>Max Health</p>
                            <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                value={this.state.max_health}
                                onChange={e => checkNum(e.target.value) ? this.setState({ max_health: e.target.value }) : null} />

                            <p>Fatigue</p>
                            <input className={`modalEditInput ${theme}-inputSpecial`} id="modalEditInput"
                                value={this.state.fatigue}
                                onChange={e => checkNum(e.target.value) ? this.setState({ fatigue: e.target.value }) : null} />

                            <ToggleHidden
                                on={hidden}
                                hide={this.handleHide} />

                            <button className={`${theme}-secColor ${theme}-secFont`} id="modalAddButton"
                                onClick={_ => this.handleSubmit(color, name, weapons, action, dice, combatId, hidden, max_health, fatigue)}>SUBMIT</button>
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