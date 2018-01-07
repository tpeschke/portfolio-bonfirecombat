import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import { SketchPicker } from 'react-color';

import { OPENMODAL2 } from '../../../ducks/reducer'
import {EDITFIGHTER} from '../../../ducks/CompReducers/CombatantsReducer'

class ActEditFighter extends Component {
    constructor() {
        super()

        this.state = {
            color: '',
            name: '',
            speed: 0,
            id: 0
        }

    }

    componentWillReceiveProps(next) {
        this.setState({
            color: next.color,
            name: next.name,
            speed: next.speed,
            id: next.id
        })
    }

    handleChange = (color, event) => {
        this.setState({ color: color.hex });
    }

    handleName = (name) => {
        this.setState({ name: name })
    }

    handleSpeed = (speed) => {
        this.setState({ speed: speed })
    }

    handleSubmit = () => {
        var editedFighter = {
            id: this.state.id,
            namefighter: this.state.name,
            colorcode: this.state.color,
            speed: +this.state.speed
        }

        this.props.EDITFIGHTER(editedFighter)

        this.props.OPENMODAL2()

        this.forceUpdate()

    }


    render() {

        const { color, name, speed } = this.state;
        const { editopen2 } = this.props

        return (
            <div>

                <Modal open={editopen2} onClose={this.props.OPENMODAL2} little
                classNames={{ modal: 'modalBaseToP' }}>
                    <div className="outModalNew">
                        <div className="modalBannerEdit">
                        </div >
                        <div className="inModalNew">

                            <div className="modalLeft">
                                <SketchPicker
                                    color={color}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="modalRight">

                                <h1 id="newCombat">Edit Combatant</h1>

                                <div className="border modalBorder"></div>

                                <div className="modalEditInputs">
                                    <p>Name</p>
                                    <input placeholder={name} id="modalEditInput"
                                        onChange={e => this.handleName(e.target.value)} />

                                    <p>Speed</p>
                                    <input placeholder={speed} id="modalEditInput"
                                        onChange={e => this.handleSpeed(e.target.value)} />

                                    <button id="modalEditButton"
                                        onClick={_ => this.handleSubmit()}
                                    >SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
    var { editopen2 } = state

    return {
        editopen2
    }
}

export default connect(mapStateToProps, { OPENMODAL2, EDITFIGHTER })(ActEditFighter)