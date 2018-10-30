import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { WEAPONMODAL2, SELECTWEAPON, ADDWEAPON, DELETEWEAPON } from '../../../ducks/reducer'

class ActWeapon extends Component {
    constructor() {
        super()

        this.state = {
            holdWeapon: '',
            holdSpeed: 0,
            holdId: null,
            edit: false,
        }
    }

    select = (weapon) => {
        this.props.SELECTWEAPON(weapon, this.props.id)
        this.props.WEAPONMODAL2()
    }

    submitWeapon = () => {
        let { id, ADDWEAPON } = this.props
        let { holdWeapon, holdSpeed, holdId } = this.state
        ADDWEAPON(id, holdWeapon, holdSpeed, holdId)
        this.setState({ holdWeapon: '', holdSpeed: 0, holdId: null, edit: false })
    }

    deleteWeapon = () => {
        let { id, DELETEWEAPON } = this.props
        let { holdId } = this.state
        DELETEWEAPON(id, holdId)
        this.setState({ holdWeapon: '', holdSpeed: 0, holdId: null, edit: false })
    }

    editWeapon = (w) => {
        let { id, weapon, speed } = w
        this.setState({ edit: !this.state.edit, holdId: id, holdWeapon: weapon, holdSpeed: speed })
    }

    render() {
        let { weapons, id, open, WEAPONMODAL2 } = this.props

        let display = weapons.map((val, i) => {
            return (
                <div key={`${val.id}${i}${id}`} className={val.selected == 1 ? 'wpItem wpSelected' : 'wpItem'}>
                    <p className="wpItemHeader"
                        onClick={_ => this.select(val.id)}>{val.weapon}</p>
                    <p className="wpSpeed">{val.speed}</p>
                    <button className="wpSpeed"
                        onClick={_ => this.editWeapon(val)}>---</button>
                </div>
            )
        })

        let edit = () => {
            if (this.state.edit) {
                return (
                    <div className="wpInput">
                        <input type="text"
                            className="wpItemHeader" id="wpInputItem"
                            placeholder={this.state.holdWeapon}
                            onChange={e => this.setState({ holdWeapon: e.target.value })} />
                        <input type="text"
                            className="wpSpeed" id="wpInputItem"
                            placeholder={this.state.holdSpeed}
                            onChange={e => this.setState({ holdSpeed: e.target.value })} />
                        <button
                            className="wpSpeed"
                            onClick={this.submitWeapon}>+</button>
                        <button
                            className="wpSpeed"
                            onClick={this.deleteWeapon}>-</button>
                    </div>
                )
            } else {
                return (
                    <div className='wpItemTable'>
                        <div className='wpTableHeader'>
                            <p className="wpItemHeader">Weapon</p>
                            <p className="wpSpeed">Speed</p>
                            <p className="wpSpeed">Edit</p>
                        </div>

                        {display}

                        <div className="wpInput">
                            <input type="text"
                                className="wpItemHeader" id="wpInputItem"
                                onChange={e => this.setState({ holdWeapon: e.target.value })} />
                            <input type="text"
                                className="wpSpeed" id="wpInputItem"
                                onChange={e => this.setState({ holdSpeed: e.target.value })} />
                            <button
                                className="wpSpeed"
                                onClick={this.submitWeapon}>+</button>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div>
                <Modal open={open} onClose={WEAPONMODAL2} little
                    classNames={{ modal: 'modalBaseToP' }}>
                    <div className="modalWeaponOuter">
                        <div className="modalWeaponInner">
                            <h2 className="wpHeader">Weapon Picker</h2>
                            <div className="border modalBorder wpHeader"></div>

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
        open: state.weaponModal2
    }
}
export default connect(mapStateToProps, { WEAPONMODAL2, SELECTWEAPON, ADDWEAPON, DELETEWEAPON })(ActWeapon)