import React, { Component } from 'react'
import Mousetrap from 'mousetrap'

import CounterLeft from './CounterLeft';
import CounterRight from './CounterRight';
import CounterMiddle from './CounterMiddle'

import './Count.css'

import { connect } from 'react-redux'
import socketFun from '../../playerview/SocketApi'
import { INCREASECOUNT, DECREASECOUNT, RESETCOUNT } from '../../ducks/CompReducers/counterReducer'


class Counter extends Component {
    constructor() {
        super()

        this.state = {
            timeId: null
        }
    }

    componentDidMount() {
        Mousetrap.bind(['d'], this.props.INCREASECOUNT)
        Mousetrap.bind(['a'], this.props.DECREASECOUNT)
        Mousetrap.bind(['w', 'space'], this.autoTimer1)
        Mousetrap.bind(['e'], this.autoTimer2)
        Mousetrap.bind(['s'], this.stopTime)
        Mousetrap.bind(['x'], this.props.RESETCOUNT)
    }

    componentWillUnmount() {
        Mousetrap.unbind(['d'], this.props.INCREASECOUNT)
        Mousetrap.unbind(['a'], this.props.DECREASECOUNT)
        Mousetrap.unbind(['w', 'space'], this.autoTimer1)
        Mousetrap.unbind(['e'], this.autoTimer2)
        Mousetrap.unbind(['s'], this.stopTime)
        Mousetrap.unbind(['x'], this.props.RESETCOUNT)
        this.stopTime()
    }

    componentWillReceiveProps(next) {
        socketFun.updateCount({count: next.count, hash: this.props.hash})
    }
compo
    stopTime = () => {
        clearInterval(this.state.timeId);
    }

    autoTimer1 = () => {
        clearInterval(this.state.timeId)
        this.setState({ timeId: setInterval(this.props.INCREASECOUNT, 1000) })
    }

    autoTimer2 = () => {
        clearInterval(this.state.timeId)
        this.setState({ timeId: setInterval(this.props.INCREASECOUNT, 500) })
    }

    render() {

        return (
            <div className="counterMain">

                <CounterLeft
                    RESETCOUNT={this.props.RESETCOUNT}
                    stopTime={this.stopTime}
                    DECREASECOUNT={this.props.DECREASECOUNT}
                    user={this.props.user} />

                <CounterMiddle
                    count={this.props.count} />

                <CounterRight
                    INCREASECOUNT={this.props.INCREASECOUNT}
                    autoTimer1={this.autoTimer1}
                    autoTimer2={this.autoTimer2}
                    user={this.props.user}  />

            </div>
        )
    }
}

function mapStateToProps(state) {

    var { count, user, hash } = state

    return {
        count,
        user,
        hash
    }
}

let actionBuilder = {
    INCREASECOUNT,
    DECREASECOUNT,
    RESETCOUNT
}

export default connect(mapStateToProps, actionBuilder)(Counter)