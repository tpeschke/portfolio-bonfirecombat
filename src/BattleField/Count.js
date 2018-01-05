import React, { Component } from 'react'

import { connect } from 'react-redux'

import { INCREASECOUNT } from '../ducks/CompReducers/counterReducer'

class Counter extends Component {

    render() {

        return (
            <div className="counterMain">

                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>0</button>
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>X</button>
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>-</button>
                </div>

                <div className="counterMiddle">
                    <h3>the Count</h3>
                    <div className="border countborder"></div>
                    <h3 className="countNum">{this.props.count}</h3>
                </div>

                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>+</button>
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>></button>
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}>>></button>
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