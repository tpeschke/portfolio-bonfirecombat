import React, { Component } from 'react'

import { connect } from 'react-redux'

import { ADDNEWSTATUS } from '../../ducks/CompReducers/StatusReducer'
import socketFun from '../../playerview/SocketApi'

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import './AddStatus.css'

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

    makeid= () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

    handleSubmit = () => {

        var newId = this.makeid()

        var newStatus = {
            id: newId,
            namestatus: this.state.name,
            timestatus: this.state.duration + +this.props.count
        }

        socketFun.playerAddStatus(status: newStatus, hash: this.props.hash )
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
                                <p id="statusName">Name</p>
                                <input className="inputFinder" id="statusInput"
                                    onChange={e => this.handleName(e.target.value)} />

                                <p>Duration</p>
                                <input className="inputFinder" id="statusInput"
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

    var {count, hash} = state
    return {
        count,
        hash
    }
}

export default connect(mapStateToProps, { ADDNEWSTATUS })(NewStatus)