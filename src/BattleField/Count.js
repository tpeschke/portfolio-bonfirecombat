import React, { Component } from 'react'

import { connect } from 'react-redux'

import { INCREASECOUNT, DECREASECOUNT, RESETCOUNT } from '../ducks/CompReducers/counterReducer'

class Counter extends Component {
    constructor() {
        super()

        this.state = {
            timeId: 0
        }
    }

    stopTime = () => {
        clearInterval(this.state.timeId);
    }

    autoTimer1 = () => {
        clearInterval(this.state.timeId) 
        this.setState( { timeId: setInterval(this.props.INCREASECOUNT, 1000) } )
    }

    autoTimer2 = () => {
        clearInterval(this.state.timeId)
        this.setState( { timeId: setInterval(this.props.INCREASECOUNT, 500) } )
    }

    render() {

        return (
            <div className="counterMain">

                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.RESETCOUNT}>0</button>
                    <button className="counterButton"
                        onClick={this.stopTime}>X</button>
                    <button className="counterButton"
                        onClick={this.props.DECREASECOUNT}>-</button>
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
                        onClick={this.autoTimer1}>></button>
                    <button className="counterButton"
                        onClick={this.autoTimer2}>>></button>
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
    INCREASECOUNT,
    DECREASECOUNT,
    RESETCOUNT
}

export default connect(mapStateToProps, actionBuilder)(Counter)