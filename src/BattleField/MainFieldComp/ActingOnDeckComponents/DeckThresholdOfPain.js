import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

import { OPENTOP, HANDLETOP } from '../../../ducks/reducer'

class DeckToP extends Component {
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

        if (this.props.topopen) {
        this.props.OPENTOP()
        }

        this.forceUpdate()
    }


    render() {

        const { topopen } = this.props

        return (
            <div>

                <Modal open={topopen} onClose={this.props.OPENTOP} little>
                    <div className="outModalNew">
                        
                            <div className="modalRight">
                                {/* <p>Enter How Much They Failed By</p> */}
                                <input id="modalNewInput"
                                    onBlur={e => this.handleChange(e.target.value)} />
                            </div>
                        </div>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state) {
    var { topopen } = state

    return {
        topopen
    }
}

export default connect(mapStateToProps, { OPENTOP, HANDLETOP })(DeckToP)