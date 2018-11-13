import React, { Component } from 'react';
import socketFun from '../../../playerview/SocketApi'

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import {checkNum} from '../../../components/validation'

import { OPENTOP2 } from '../../../ducks/reducer'
import {HANDLETOP} from '../../../ducks/CompReducers/CombatantsReducer'

class ActToP extends Component {
    constructor() {
        super()

        this.state = {
            failedBy: 0,
            id: 0
        }

    }

    componentWillReceiveProps(next) {
        this.setState({
            id: next.id
        })
    }

    handleChange = (e) => {

        let failedBy = 0
        if (checkNum(+e)) {
            failedBy = +e * 3
        }

        var topFighter = {
            id: this.state.id,
            failedBy
        }

        this.props.HANDLETOP(topFighter)
        socketFun.playerTop({id: this.state.id, hash: this.props.hash})

        if (this.props.topopen2) {
            this.props.OPENTOP2()
        }

        this.forceUpdate()
    }


    render() {

        const { topopen2, theme } = this.props

        return (
            <div>

                <Modal open={topopen2} onClose={this.props.OPENTOP2} little
                classNames={{ modal: 'modalBaseToP'}}
                showCloseIcon={false}>
                <div className={`modalToPOuter ${theme}-modalToPOuter`}>
                    
                        <div className={`modalToPInner ${theme}-modalToPInner`}>
                            <h2 className={`${theme}-fourColor ${theme}-secFont`} id="modalHeader">Enter How Much They Failed By</h2>
                            <div className={`${theme}-border modalBorder`}></div>
                            <input className={`modalEditInput ${theme}-inputSpecial`} id="modalToPInput"
                                onBlur={e => this.handleChange(e.target.value)} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
    var { topopen2, theme } = state

    return {
        topopen2,
        theme
    }
}

export default connect(mapStateToProps, { OPENTOP2, HANDLETOP })(ActToP)