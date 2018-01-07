import React, { Component } from 'react'

import { connect } from 'react-redux'

import { ADDNEWSTATUS } from '../../ducks/CompReducers/StatusReducer'

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

class NewStatus extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            name: '',
            duration: 0
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleName = (name) => {
        this.setState({ name: name })
    }

    handleDuration = (duration) => {
        this.setState({ duration: +duration })
    }

    handleSubmit = () => {

        var newId = Math.floor(Math.random() * 1000)

        var newStatus = {
            id: newId,
            namestatus: this.state.name,
            timestatus: this.state.duration + 1
        }

        this.props.ADDNEWSTATUS(newStatus)

        this.onCloseModal()

        this.forceUpdate()
    }

    render() {

        const { open } = this.state

        return (
            < div >
                <button
                    className='workshopButton'
                    onClick={this.onOpenModal}
                >Add New Status</button>

                <Modal open={open} onClose={this.onCloseModal} little
                    classNames={{ modal: 'modalBaseToP' }}>
                    <div className="modalStatusOuter">

                        <div className="modalStatusInner">
                            <h1 id="newStatus">Add New Status</h1>

                            <div className="modalEditInputs">

                            <div className="border modalBorder"></div>
                                <p>Name</p>
                                <input id="statusInput"
                                    onChange={e => this.handleName(e.target.value)} />

                                <p>Duration</p>
                                <input id="statusInput"
                                    onChange={e => this.handleDuration(e.target.value)} />
                            </div>
                            <button id="modalStatusButton"
                                onClick={_ => this.handleSubmit()}
                            >SUBMIT</button>
                        </div>
                    </div>
                </Modal>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { ADDNEWSTATUS })(NewStatus)