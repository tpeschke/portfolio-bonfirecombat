import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import { SketchPicker } from 'react-color';

import { ADDNEWCOMBATANT } from '../../ducks/reducer'

class AddNewFighter extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            color: '#fff',
            name: '',
            speed: 0,
            action: 0,
        }

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    //==========================================
    handleChange = (color, event) => {
        this.setState({ color: color.hex });
    }

    handleName = (name) => {
        this.setState({ name: name })
    }

    handleSpeed = (speed) => {
        this.setState({ speed: speed })
    }

    handleAction = (action) => {
        var totalAction = +this.props.count + +action -1
        this.setState({ action: totalAction })
    }

    handleSubmit = (c, n, s, a, id) => {

        var newId = Math.floor(Math.random() * 1000)
    
        var newFighter = {
            id: newId,
            namefighter: n, 
            colorcode: c,
            speed: s, 
            actioncount: a, 
            topcheck: '0',
            acting: '0',
            dead: '0',
            idcombat: id
        }

        this.props.ADDNEWCOMBATANT(newFighter)

        this.onCloseModal()

        this.forceUpdate()
        
    }


    render() {

        const { open, color, name, speed, action } = this.state;
        const { combatId } = this.props

        return (
            <div>
                <button 
                    className="workshopButton"
                    onClick={this.onOpenModal}>Add New Combatant</button>

                <Modal open={open} onClose={this.onCloseModal} little>
                <div className="outModalNew">
                        <div className="modalBanner">
                        </div >
                        <div className="inModalNew">

                            <div className="modalLeft">
                                <SketchPicker
                                    color={this.state.color}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="modalRight">

                                <h1 id="newCombat">Add New Combatant</h1>
                                <input placeholder="Name" id="modalNewInput"
                                    onChange={e => this.handleName(e.target.value)} />

                                <input placeholder="Speed"id="modalNewInput"
                                    onChange={e => this.handleSpeed(e.target.value)} />

                                <input placeholder="Initiative" id="modalNewInput"
                                    onChange={e => this.handleAction(e.target.value)} />
 
                                 <button id="modalNewButton"
                                     onClick={_ => this.handleSubmit(color, name, speed, action, combatId)}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
        var { count, combatId } = state

        return {
            count,
            combatId
        }
    }

export default connect(mapStateToProps, {ADDNEWCOMBATANT} ) ( AddNewFighter )