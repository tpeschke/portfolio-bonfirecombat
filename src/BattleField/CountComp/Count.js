import React, { Component } from 'react'

import CounterLeft from './CounterLeft';
import CounterRight from './CounterRight';
import CounterMiddle from './CounterMiddle'

import './Count.css'

import { connect } from 'react-redux'

import { INCREASECOUNT, DECREASECOUNT, RESETCOUNT } from '../../ducks/CompReducers/counterReducer'


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

                <CounterLeft 
                    RESETCOUNT={this.props.RESETCOUNT}
                    stopTime={this.stopTime}
                    DECREASECOUNT={this.props.DECREASECOUNT}/>

                <CounterMiddle
                    count={this.props.count}/>

                <CounterRight 
                    INCREASECOUNT={this.props.INCREASECOUNT}
                    autoTimer1={this.autoTimer1}
                    autoTimer2={this.autoTimer2}/>

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