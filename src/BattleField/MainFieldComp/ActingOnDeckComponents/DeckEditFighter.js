import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import { SketchPicker } from 'react-color';

import socketFun from '../../../playerview/SocketApi'
import { OPENMODAL } from '../../../ducks/reducer'
import {EDITFIGHTER} from '../../../ducks/CompReducers/CombatantsReducer'

class DeckEditFighter extends Component {
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

        this.props.EDITFIGHTER(editedFighter);
        socketFun.playerEdit({fighter: editedFighter, hash: this.props.hash});
        this.props.OPENMODAL();

        this.forceUpdate()

    }


    render() {

        const { color, name, speed } = this.state;
        const { editopen } = this.props

        return (
            <div>

                <Modal open={editopen} onClose={this.props.OPENMODAL} little
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
                                    <input placeholder={name} className="inputFinder" id="modalEditInput"
                                        onChange={e => this.handleName(e.target.value)} />

                                    <p>Speed</p>
                                    <input placeholder={speed} className="inputFinder" id="modalEditInput"
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
    var { editopen, hash } = state

    return {
        editopen,
        hash
    }
}

export default connect(mapStateToProps, { OPENMODAL, EDITFIGHTER })(DeckEditFighter)