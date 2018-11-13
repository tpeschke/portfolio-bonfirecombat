import React, { Component } from 'react'

import { connect } from 'react-redux'

import { ADDNEWSTATUS } from '../../ducks/CompReducers/StatusReducer'
import socketFun from '../../playerview/SocketApi'

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import { checkStr, checkNum } from '../../components/validation'

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

    makeid = () => {
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

        socketFun.playerAddStatus({ status: newStatus, hash: this.props.hash })
        this.props.ADDNEWSTATUS(newStatus)

        this.onCloseModal()

        this.forceUpdate()
    }

    render() {

        const { open } = this.state
        let { theme } = this.props

        return (
            < div >
                <button
                    className={`workshopButton ${theme}-font`}
                    onClick={this.onOpenModal}
                >Add New Status</button>

                <Modal open={open} onClose={this.onCloseModal} little
                    classNames={{ modal: 'modalBaseToP' }}
                    showCloseIcon={false}>
                    <div className={`modalStatusOuter ${theme}-modalStatusOuter`}>

                        <div className={`modalStatusInner ${theme}-modalStatusInner`}>
                            <h1 className={`${theme}-thirdColor`} id="newStatus">Add New Status</h1>

                            <div className="modalStatusBox">

                                <div className={`${this.props.theme}-border modalBorder`}></div>

                                <p>Status Name</p>
                                <input className={`modalEditInput ${theme}-inputSpecial`}
                                    value={this.state.name}
                                    onChange={e => checkStr(e.target.value) ? this.handleName(e.target.value) : null} />

                                <p>Duration</p>
                                <input className={`modalEditInput ${theme}-inputSpecial`}
                                    value={this.state.duration}
                                    onChange={e => checkNum(e.target.value) ? this.handleDuration(e.target.value) : null} />
                            </div>
                            <button className={`${theme}-secColor ${theme}-secFont`} id="modalAddButton"
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

    var { count, hash, theme } = state
    return {
        count,
        hash,
        theme
    }
}

export default connect(mapStateToProps, { ADDNEWSTATUS })(NewStatus)