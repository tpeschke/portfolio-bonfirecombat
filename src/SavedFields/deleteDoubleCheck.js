import React, { Component } from 'react'

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import './deleteCheck.css'

export default class DeleteDoubleCheck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            choppingBlock: 100000
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ choppingBlock: next.id })
    }

    render() {

        var { open, close, theme } = this.props

        return (
            <div>
                <Modal open={open} onClose={close} little
                    showCloseIcon={false}
                    classNames={{ modal: 'modalDelete' }}>
                    <div className={`modalDeleteOuter ${theme}-modalDeleteOuter`}>
                        <h2 className={`${theme}-font`} id="modalCheck">Are You Sure?</h2>
                        <div className={`${theme}-border modalBorder`} id="checkBorder"></div>
                        <p>Once you've deleted a field,</p>
                        <p>there's no going back</p>
                        <button
                            className={`${theme}-font`}
                            id="modalDeleteButton"
                            onClick={_ => this.props.delete(this.state.choppingBlock)}
                        >DO IT</button>
                    </div>
                </Modal>
            </div>
        )
    }
}