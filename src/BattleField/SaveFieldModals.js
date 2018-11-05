import React, { Component } from 'react'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal'
import LoadingBar from '../components/loadingBar'

import './SaveModals.css'

export default class SaveFieldModal extends Component {

    componentWillReceiveProps(next){
        next.finished !== this.props.finished && !this.props.finished ? setTimeout(this.props.TOGGLESAVE, 1000) : null;
    }

    render() {

        var {pending, finished} = this.props

        return (
            <div>
                <Modal open={pending} little
                    classNames={{ modal : 'baseModalSave' }}
                    showCloseIcon={false}>
                    <div className="outModal">
                        <h1 className="outModal">Saving</h1>
                        <LoadingBar />
                    </div>
                </Modal>

                <Modal open={finished} little
                    classNames={{ modal: 'baseModalSave' }}
                    showCloseIcon={false}>
                    <div>
                        <h1>Saved</h1>
                    </div>
                </Modal>
            </div>
        )
    }
}