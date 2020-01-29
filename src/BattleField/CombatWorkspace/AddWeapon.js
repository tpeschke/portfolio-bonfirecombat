import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SELECTWEAPON, DELETEWEAPON } from '../../ducks/reducer'

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

    select = (weapon) => {
        let { selectWeapon } = this.props
        selectWeapon(weapon)
    }

    submitWeapon = () => {
        let { addWeapon } = this.props
        let { holdWeapon, holdSpeed, holdId, holdEncumb } = this.state
        addWeapon({ weapon: holdWeapon, speed: holdSpeed, selected: '0', encumb: holdEncumb }, holdId)
        this.setState({ edit: false })
    }

    deleteWeapon = () => {
        let { holdId } = this.state
        this.setState({ edit: false })
        this.props.deleteWeapon(holdId)
    }

    editWeapon = (w) => {
        let { id, weapon, speed, encumb, selected } = w
        if (selected !== '1') { 
            this.setState({ edit: true, holdId: id, holdWeapon: weapon, holdSpeed: speed, holdEncumb: encumb })
        }
    }

    saveEdit = () => {
        let { holdId, holdWeapon, holdSpeed, holdEncumb } = this.state
        this.props.editWeapon({ id: holdId, weapon: holdWeapon, speed: holdSpeed, encumb: holdEncumb })
        this.setState({ edit: false, holdSpeed: 0, holdWeapon: '' })
    }

    render() {
        let { weapons, id, theme, checkStr, checkNum } = this.props

        let display = weapons.map((val, i) => {
            return (
                <div key={`${val.id}${i}${id}`} className={val.selected == 1 ? 'wpItem wpSelected' : 'wpItem'}>
                    <p className="wpItemHeader"
                        onClick={_ => this.select(val.id)}>{val.weapon}</p>
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
                            onClick={this.saveEdit}><i className="fas fa-check"></i></button>
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
                        <div className="wpTableInner addwpInner">
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
            <div className="addwpbody">
                <h2 className={`wpHeader ${theme}-secColor`}>Add Weapon</h2>
                <div className={`${theme}-border modalBorder wpHeader`}></div>

                {edit()}

                <button className={`wpButton ${theme}-secColor ${theme}-secFont`}
                    onClick={this.props.doneWithWeapon}>Okay, I'm done!</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.weaponModal,
        theme: state.theme
    }
}
export default connect(mapStateToProps, { SELECTWEAPON, DELETEWEAPON })(DeckWeapon)