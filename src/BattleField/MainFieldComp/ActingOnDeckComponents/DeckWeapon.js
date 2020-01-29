import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { WEAPONMODAL, SELECTWEAPON, ADDWEAPON, DELETEWEAPON } from '../../../ducks/reducer'
import socketFun from '../../../playerview/SocketApi'
import axios from 'axios'
import { checkStr, checkNum } from '../../../components/validation'

class DeckWeapon extends Component {
    constructor() {
        super()

        this.state = {
            holdWeapon: '',
            holdSpeed: 0,
            holdEncumb: 10,
            holdId: null,
            edit: false,
        }
    }

    select = (wid, weapon) => {
        let { id, SELECTWEAPON, WEAPONMODAL, hash } = this.props
        socketFun.playerWeapon({ hash, weapon, id })
        SELECTWEAPON(wid, id)
        WEAPONMODAL()
    }

    submitWeapon = () => {
        let { id, ADDWEAPON } = this.props
        let { holdWeapon, holdSpeed, holdId, holdEncumb } = this.state

        if (holdWeapon !== '' && holdSpeed !== 0) {
            ADDWEAPON(id, holdWeapon, holdSpeed, holdId, holdEncumb)
            this.forceUpdate()
            if (holdId) {
                this.setState({ edit: false, holdId: null, holdWeapon: '', holdSpeed: 0, holdEncumb: 10, })
            }
        }
    }

    deleteWeapon = () => {
        let { id, DELETEWEAPON } = this.props
        let { holdId } = this.state
        if (holdId !== 1) {
            axios.delete(`/api/weapon/${holdId}`)
        }
        DELETEWEAPON(id, holdId)
        this.setState({ edit: false, holdId: null, holdWeapon: '', holdSpeed: 0, holdEncumb: 10, })
    }

    editWeapon = (w) => {
        let { id, weapon, speed, encumb, selected } = w
        if (selected !== '1') {
            this.setState({ edit: !this.state.edit, holdId: id, holdWeapon: weapon, holdSpeed: speed, holdEncumb: encumb })
        }
    }

    render() {
        let { weapons, id, open, WEAPONMODAL } = this.props

        let display = weapons.map((val, i) => {
            return (
                <div key={`${val.id}${i}${id}`} className={val.selected == 1 ? 'wpItem wpSelected' : 'wpItem'}>
                    <p className="wpItemHeader"
                        onClick={_ => this.select(val.id, val.weapon)}>{val.weapon}</p>
                    <p className="wpSpeed">{val.speed}</p>
                    <p className="wpSpeed">{val.encumb}</p>
                    <button className="wpSpeed"
                        onClick={_ => this.editWeapon(val)}><i class="fas fa-edit"></i></button>
                </div>
            )
        })

        let edit = () => {
            if (this.state.edit) {
                return (
                    <div className="wpInput">
                        <input type="text"
                            className="wpItemHeader" id="wpInputItem"
                            value={this.state.holdWeapon}
                            onChange={e => checkStr(e.target.value) ? this.setState({ holdWeapon: e.target.value }) : null} />
                        <input type="text"
                            className="wpSpeed" id="wpInputItem"
                            value={this.state.holdSpeed}
                            onChange={e => checkNum(e.target.value) ? this.setState({ holdSpeed: e.target.value }) : null} />
                        <input type="text"
                            className="wpSpeed" id="wpInputItem"
                            value={this.state.holdEncumb}
                            onChange={e => checkNum(e.target.value) ? this.setState({ holdEncumb: e.target.value }) : null} />
                        <button
                            className="wpSpeed"
                            onClick={this.submitWeapon}><i className="fas fa-check"></i></button>
                        <button
                            className="wpSpeed"
                            onClick={this.deleteWeapon}><i className="fas fa-trash-alt"></i></button>
                    </div>
                )
            } else {
                return (
                    <div className='wpItemTable'>
                        <div className='wpTableHeader'>
                            <p className="wpItemHeader">Weapon</p>
                            <p className="wpSpeed">Speed</p>
                            <p className="wpSpeed">Encumb</p>
                            <p className="wpSpeed">Edit</p>
                        </div>
                        <div className="wpTableInner">
                            {display}

                            <div className="wpInput">
                                <input type="text"
                                    className="wpItemHeader" id="wpInputItem"
                                    value={this.state.holdWeapon}
                                    onChange={e => checkStr(e.target.value) ? this.setState({ holdWeapon: e.target.value }) : null} />
                                <input type="text"
                                    className="wpSpeed" id="wpInputItem"
                                    value={this.state.holdSpeed}
                                    onChange={e => checkNum(e.target.value) ? this.setState({ holdSpeed: e.target.value }) : null} />
                                <input type="text"
                                    className="wpSpeed" id="wpInputItem"
                                    value={this.state.holdEncumb}
                                    onChange={e => checkNum(e.target.value) ? this.setState({ holdEncumb: e.target.value }) : null} />
                                <button
                                    className="wpSpeed"
                                    onClick={this.submitWeapon}><i class="fas fa-plus-square"></i></button>
                            </div>
                        </div>

                    </div>
                )
            }
        }

        return (
            <div>
                <Modal open={open} onClose={WEAPONMODAL} little
                    classNames={{ modal: 'modalBaseToP' }}>
                    <div className="modalWeaponOuter">
                        <div className="modalWeaponInner">
                            <h2 className="wpHeader">Weapon Picker</h2>
                            <div className={`${this.props.theme}-border modalBorder wpHeader`}></div>

                            {edit()}

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.weaponModal,
        hash: state.hash,
        theme: state.theme
    }
}
export default connect(mapStateToProps, { WEAPONMODAL, SELECTWEAPON, ADDWEAPON, DELETEWEAPON })(DeckWeapon)