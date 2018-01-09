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
        this.setState({ choppingBlock: next.id})
    }

    render() {

        var { open, close } = this.props

        return (
            <div>
                <Modal open={open} onClose={close} little
                    classNames={{ modal: 'modalDelete'}}>
                    <div className="modalDeleteOuter">
                        <h2>Are You Sure?</h2>
                        <div className="border modalBorder"></div>
                        <p>Once you've deleted a field,</p>
                        <p>there's no going back</p>
                        <button 
                            id="modalDeleteButton"
                            onClick={_=>this.props.delete(this.state.choppingBlock)}
                            >DO IT</button>
                    </div>
                </Modal>
            </div>
        )
    }
}