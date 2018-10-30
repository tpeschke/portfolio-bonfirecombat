import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SELECTWEAPON, DELETEWEAPON } from '../../ducks/reducer'

class DeckWeapon extends Component {
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
        let { selectWeapon } = this.props
        selectWeapon(weapon)
    }

    submitWeapon = () => {
        let { addWeapon } = this.props
        let { holdWeapon, holdSpeed, holdId } = this.state
        addWeapon({ weapon: holdWeapon, speed: holdSpeed, selected: '0' }, holdId)
        this.setState({ edit: false })
    }

    deleteWeapon = () => {
        let { holdId } = this.state
        this.setState({ edit: false })
        this.props.deleteWeapon(holdId)
    }

    editWeapon = (w) => {
        let { id, weapon, speed } = w
        this.setState({ edit: true, holdId: id, holdWeapon: weapon, holdSpeed: speed })
    }

    saveEdit = () => {
        let { holdId, holdWeapon, holdSpeed } = this.state
        this.props.editWeapon({ id: holdId, weapon: holdWeapon, speed: holdSpeed })
        this.setState({ edit: false })
    }

    render() {
        let { weapons, id } = this.props

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
                            onClick={this.saveEdit}>+</button>
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
                            <p className="wpSpeed wpEdit">Edit</p>
                        </div>
                        <div className="wpTableInner addwpInner">
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

                    </div>
                )
            }
        }

        return (
            <div className="addwpbody">
                <h2 className="wpHeader">Add Weapon</h2>
                <div className="border modalBorder wpHeader"></div>

                {edit()}

                <button className="wpButton"
                    onClick={this.props.doneWithWeapon}>Okay, I'm done!</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.weaponModal
    }
}
export default connect(mapStateToProps, { SELECTWEAPON, DELETEWEAPON })(DeckWeapon)