import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import { OPENTOP2, HANDLETOP } from '../../../ducks/reducer'

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

        var topFighter = {
            id: this.state.id,
            failedBy: +e * 3
        }

        this.props.HANDLETOP(topFighter)

        if (this.props.topopen2) {
            this.props.OPENTOP2()
        }

        this.forceUpdate()
    }


    render() {

        const { topopen2 } = this.props

        return (
            <div>

                <Modal open={topopen2} onClose={this.props.OPENTOP2} little
                classNames={{ modal: 'modalBaseToP'}}>
                <div className="modalToPOuter">
                    
                        <div className="modalToPInner">
                            <h2 id="modalHeader">Enter How Much They Failed By</h2>
                            <input id="modalToPInput"
                                onBlur={e => this.handleChange(e.target.value)} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
    var { topopen2 } = state

    return {
        topopen2
    }
}

export default connect(mapStateToProps, { OPENTOP2, HANDLETOP })(ActToP)