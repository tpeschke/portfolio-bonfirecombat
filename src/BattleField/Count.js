import React, { Component } from 'react'

import { connect } from 'react-redux'

import { INCREASECOUNT } from '../ducks/CompReducers/counterReducer'

class Counter extends Component {

    render() {

        return (
            <div className="counterMain">

                <div className="counterSide">
                    <button onClick={this.props.INCREASECOUNT}>0</button>
                    <button onClick={this.props.INCREASECOUNT}>X</button>
                    <button onClick={this.props.INCREASECOUNT}>-</button>
                </div>

                <div className="counterMiddle">
                    <h1>the Count</h1>
                    {this.props.count}
                </div>

                <div className="counterSide">
                    <button onClick={this.props.INCREASECOUNT}>+</button>
                    <button onClick={this.props.INCREASECOUNT}>></button>
                    <button onClick={this.props.INCREASECOUNT}>>></button>
                </div>


            </div>
        )
    }
}

function mapStateToProps(state) {

    var { count } = state

    return {
        count
    }
}

let actionBuilder = {
    INCREASECOUNT
}

export default connect(mapStateToProps, actionBuilder)(Counter)